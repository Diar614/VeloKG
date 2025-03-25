import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, orderBy, addDoc, doc, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import Header from '../Header';
import SearchSidebar from '../SearchSidebar';
import './AskQuestion.css';

const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [filter, setFilter] = useState('newest');
  const [activeAnswerForm, setActiveAnswerForm] = useState(null);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      filter === 'popular' 
        ? orderBy('likesCount', 'desc') 
        : orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString(),
          answers: data.answers?.map(answer => ({
            ...answer,
            createdAt: answer.createdAt?.toDate?.()?.toISOString()
          })) || []
        };
      });
      setSubmittedQuestions(questionsData);
    });

    return () => unsubscribe();
  }, [filter]);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderVisible(window.scrollY <= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAnswers = (questionId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Для задавания вопросов необходимо войти в систему');
      return;
    }
    
    if (question.trim().length < 10) {
      setError('Вопрос должен содержать не менее 10 символов');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'questions'), {
        text: question,
        createdAt: new Date(),
        author: {
          uid: currentUser.uid,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          email: currentUser.email
        },
        likes: [],
        likesCount: 0,
        answers: []
      });
      
      setQuestion('');
    } catch (err) {
      console.error('Ошибка при отправке вопроса:', err);
      setError('Ошибка при отправке вопроса');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnswer = async (questionId) => {
    if (!currentUser) {
      setError('Для ответов необходимо войти в систему');
      return;
    }

    if (!newAnswer.trim()) {
      setError('Ответ не может быть пустым');
      return;
    }

    try {
      const questionRef = doc(db, 'questions', questionId);
      const newAnswerData = {
        text: newAnswer,
        createdAt: new Date(),
        author: {
          uid: currentUser.uid,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          email: currentUser.email
        }
      };

      const question = submittedQuestions.find(q => q.id === questionId);
      await updateDoc(questionRef, {
        answers: [...question.answers, newAnswerData]
      });

      setNewAnswer('');
      setError('');
      setActiveAnswerForm(null);
      setExpandedAnswers(prev => ({
        ...prev,
        [questionId]: true
      }));
    } catch (err) {
      console.error('Ошибка при отправке ответа:', err);
      setError('Ошибка при отправке ответа');
    }
  };

  const handleLike = async (questionId) => {
    if (!currentUser) {
      setError('Для оценки вопросов необходимо войти в систему');
      return;
    }

    try {
      const questionRef = doc(db, 'questions', questionId);
      const question = submittedQuestions.find(q => q.id === questionId);
      const hasLiked = question.likes.includes(currentUser.uid);

      await updateDoc(questionRef, {
        likes: hasLiked 
          ? question.likes.filter(uid => uid !== currentUser.uid)
          : [...question.likes, currentUser.uid],
        likesCount: hasLiked ? question.likesCount - 1 : question.likesCount + 1
      });
    } catch (err) {
      console.error('Ошибка при оценке вопроса:', err);
      setError('Ошибка при оценке вопроса');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!currentUser) {
      setError('Необходимо войти в систему');
      return;
    }

    const questionToDelete = submittedQuestions.find(q => q.id === questionId);
    
    if (questionToDelete.author.uid !== currentUser.uid) {
      setError('Вы можете удалять только свои вопросы');
      return;
    }

    if (!window.confirm('Вы уверены, что хотите удалить этот вопрос?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'questions', questionId));
    } catch (err) {
      console.error('Ошибка при удалении вопроса:', err);
      setError('Ошибка при удалении вопроса');
    }
  };

  const handleDeleteAnswer = async (questionId, answerIndex) => {
    if (!currentUser) {
      setError('Необходимо войти в систему');
      return;
    }

    const question = submittedQuestions.find(q => q.id === questionId);
    const answerToDelete = question.answers[answerIndex];
    
    if (answerToDelete.author.uid !== currentUser.uid) {
      setError('Вы можете удалять только свои ответы');
      return;
    }

    if (!window.confirm('Вы уверены, что хотите удалить этот ответ?')) {
      return;
    }

    try {
      const questionRef = doc(db, 'questions', questionId);
      const updatedAnswers = [...question.answers];
      updatedAnswers.splice(answerIndex, 1);
      
      await updateDoc(questionRef, {
        answers: updatedAnswers
      });
    } catch (err) {
      console.error('Ошибка при удалении ответа:', err);
      setError('Ошибка при удалении ответа');
    }
  };

  const getUserInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="ask-question-page">
      <SearchSidebar
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
      />
      <Header
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
        isHeaderVisible={isHeaderVisible}
      />

      <div className="ask-question-container">
        <div className="ask-question-header">
          <h1>Вопросы и ответы</h1>
          <div className="filter-buttons">
            <button 
              className={filter === 'newest' ? 'active' : ''}
              onClick={() => setFilter('newest')}
            >
              Новые
            </button>
            <button 
              className={filter === 'popular' ? 'active' : ''}
              onClick={() => setFilter('popular')}
            >
              Популярные
            </button>
          </div>
        </div>
        
        <div className="ask-question-content">
          <div className="question-form-section">
            <div className="question-form">
              <h3>{currentUser ? 'Задайте новый вопрос' : 'Войдите, чтобы задать вопрос'}</h3>
              {currentUser ? (
                <form onSubmit={handleSubmitQuestion}>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ваш вопрос"
                    rows={5}
                    disabled={isSubmitting}
                    className="question-textarea"
                  />
                  
                  {error && <p className="error-message">{error}</p>}
                  <button 
                    type="submit" 
                    disabled={!question.trim() || isSubmitting}
                    className="submit-question"
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить вопрос'}
                  </button>
                </form>
              ) : (
                <div className="auth-prompt">
                  <p>Для участия в обсуждении необходимо войти</p>
                  <button 
                    className="auth-button"
                    onClick={() => window.location.href = '/login'}
                  >
                    Войти
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="questions-list-section">
            <div className="questions-list">
              <h3>Все вопросы ({submittedQuestions.length})</h3>
              {submittedQuestions.length > 0 ? (
                submittedQuestions.map((q) => (
                  <div key={q.id} className="question-item">
                    <div className="question-content">
                      <div className="question-meta">
                        <div 
                          className="question-avatar"
                          style={{backgroundColor: '#4299e1'}}
                        >
                          {getUserInitials(q.author.name)}
                        </div>
                        <div className="question-main">
                          <div className="question-header">
                            <p className="question-author">{q.author.name}</p>
                            {currentUser?.uid === q.author.uid && (
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteQuestion(q.id)}
                                title="Удалить вопрос"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            )}
                          </div>
                          <p className="question-text">{q.text}</p>
                          <div className="question-footer">
                            <span className="question-date">
                              {new Date(q.createdAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                            <button 
                              className={`like-button ${q.likes?.includes(currentUser?.uid) ? 'liked' : ''}`}
                              onClick={() => handleLike(q.id)}
                            >
                              <span className="like-icon">❤️</span>
                              <span className="like-count">{q.likesCount || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {q.answers && q.answers.length > 0 && (
                        <div className="answers-section">
                          <button 
                            className="toggle-answers-btn"
                            onClick={() => toggleAnswers(q.id)}
                          >
                            {expandedAnswers[q.id] ? 'Скрыть ответы' : `Показать ответы (${q.answers.length})`}
                          </button>
                          
                          {expandedAnswers[q.id] && (
                            <div className="answers-list">
                              {q.answers.map((a, index) => (
                                <div key={index} className="answer-item">
                                  <div className="answer-meta">
                                    <div 
                                      className="answer-avatar"
                                      style={{backgroundColor: '#48bb78'}}
                                    >
                                      {getUserInitials(a.author.name)}
                                    </div>
                                    <div className="answer-main">
                                      <div className="answer-header">
                                        <p className="answer-author">{a.author.name}</p>
                                        {currentUser?.uid === a.author.uid && (
                                          <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteAnswer(q.id, index)}
                                            title="Удалить ответ"
                                          >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                          </button>
                                        )}
                                      </div>
                                      <p className="answer-text">{a.text}</p>
                                      <p className="answer-date">
                                        {new Date(a.createdAt).toLocaleDateString("ru-RU", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit"
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="answer-form-container">
                        {currentUser && (
                          <>
                            <button 
                              className="toggle-answer-btn"
                              onClick={() => setActiveAnswerForm(activeAnswerForm === q.id ? null : q.id)}
                            >
                              {activeAnswerForm === q.id ? 'Скрыть' : 'Ответить'}
                            </button>
                            {activeAnswerForm === q.id && (
                              <div className="answer-form">
                                <textarea
                                  value={newAnswer}
                                  onChange={(e) => setNewAnswer(e.target.value)}
                                  placeholder="Введите ответ"
                                  rows={3}
                                  className="answer-textarea"
                                />
                                
                                <button
                                  className="submit-answer"
                                  onClick={() => handleSubmitAnswer(q.id)}
                                  disabled={!newAnswer.trim()}
                                >
                                  Отправить ответ
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-questions">Пока нет вопросов. Будьте первым!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;