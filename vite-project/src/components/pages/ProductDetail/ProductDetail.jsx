import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig"; 
import { FaStar, FaTrash, FaEdit } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const bikeIndex = parseInt(searchParams.get("bikeIndex"), 10);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWheelSize, setSelectedWheelSize] = useState(29);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ text: "", rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!id) {
      setError("Продукт с таким ID не существует");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          setProduct({
            id: productSnap.id,
            ...data,
            bikes: [
              data.gravelBike1,
              data.gravelBike2,
              data.gravelBike3,
              data.gravelBike4,
              data.gravelBike5,
              data.gravelBike6,
            ].filter(Boolean),
          });
        } else {
          setError("Продукт с таким ID не существует");
        }
      } catch (err) {
        setError("Ошибка при загрузке продукта");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (!id || bikeIndex === undefined) return;

    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("productId", "==", id), where("bikeIndex", "==", bikeIndex));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [id, bikeIndex]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Для оставления отзыва необходимо войти в систему или зарегистрироваться");
      navigate("/Register", { state: { from: location.pathname } });
      return;
    }

    if (!reviewForm.text) {
      alert("Пожалуйста, напишите отзыв");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId: id,
        bikeIndex: bikeIndex,
        name: currentUser.displayName || currentUser.email.split('@')[0],
        text: reviewForm.text,
        rating: reviewForm.rating,
        date: new Date().toISOString(),
        userId: currentUser.uid,
      });

      setReviewForm({ text: "", rating: 0 });
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
    }
  };

  const handleDeleteReview = async (reviewId, userId) => {
    if (!currentUser) return;

    if (currentUser.uid !== userId) {
      alert("Вы можете удалять только свои отзывы");
      return;
    }

    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      try {
        await deleteDoc(doc(db, "reviews", reviewId));
      } catch (err) {
        console.error("Ошибка при удалении отзыва:", err);
        alert("Не удалось удалить отзыв");
      }
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review.id);
    setEditReviewText(review.text);
    setEditReviewRating(review.rating);
  };

  const handleUpdateReview = async () => {
    if (!editReviewText.trim()) {
      alert("Отзыв не может быть пустым");
      return;
    }

    try {
      await updateDoc(doc(db, "reviews", editingReviewId), {
        text: editReviewText,
        rating: editReviewRating,
        edited: true,
        editDate: new Date().toISOString(),
      });
      setEditingReviewId(null);
    } catch (err) {
      console.error("Ошибка при обновлении отзыва:", err);
      alert("Не удалось обновить отзыв");
    }
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditReviewText("");
    setEditReviewRating(0);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product || !product.bikes || product.bikes.length === 0) {
    return <div>Данные о велосипедах отсутствуют.</div>;
  }

  const bike = product.bikes[bikeIndex];

  if (!bike) {
    return <div>Велосипед не найден.</div>;
  }

  const sizesForWheel = selectedWheelSize === 27.5 ? ["XS"] : ["SM", "MD", "LG", "XL"];

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h1>{bike.name}</h1>
      </div>
      <div className="product-detail-content">
        <div className="product-detail-images">
          <div className="product-detail-main-image">
            <img src={bike.image} alt={bike.name} />
          </div>
        </div>
        <div className="product-detail-info">
          <h2>{bike.name}</h2>
          <p className="price">Цена: {bike.price} сом</p>

          <div className="description-rating">
            <p className="description">{bike.description}</p>
            {reviews.length > 0 && (
              <div className="average-rating">
                <span>Средняя оценка: {averageRating} </span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < Math.round(averageRating) ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  ))}
                </div>
                <span>({reviews.length} отзывов)</span>
              </div>
            )}
          </div>

          <div className="size-options">
            <h3>Выберите размер колеса:</h3>
            <div className="size-buttons">
              <button
                className={`size-button ${selectedWheelSize === 27.5 ? "active" : ""}`}
                onClick={() => setSelectedWheelSize(27.5)}
              >
                27.5
              </button>
              <button
                className={`size-button ${selectedWheelSize === 29 ? "active" : ""}`}
                onClick={() => setSelectedWheelSize(29)}
              >
                29
              </button>
            </div>

            <h3>Выберите размер:</h3>
            <div className="size-buttons">
              {sizesForWheel.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
  className="add-to-cart"
  onClick={() => {
    if (!selectedSize && selectedWheelSize !== 27.5) {
      alert("Пожалуйста, выберите размер");
      return;
    }
    navigate('/checkout', { 
      state: { 
        bike: bike,
        selectedSize: selectedSize,
        selectedWheelSize: selectedWheelSize
      } 
    });
  }}
>
  Заказать
</button>
        </div>
      </div>

      <div className="review-form">
        <h3>Отзывы</h3>
        {currentUser ? (
          <form onSubmit={handleReviewSubmit}>
            <p>Вы вошли как: <strong>{currentUser.displayName || currentUser.email}</strong></p>
            <textarea
              placeholder="Ваш отзыв"
              value={reviewForm.text}
              onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
              required
            />
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setReviewForm({ ...reviewForm, rating: ratingValue })}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= (hoverRating || reviewForm.rating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  </label>
                );
              })}
            </div>
            <button type="submit">Отправить отзыв</button>
          </form>
        ) : (
          <div className="auth-prompt">
            <p>Чтобы оставить отзыв, пожалуйста:</p>
            <button 
              onClick={() => navigate("/login", { state: { from: location.pathname } })}
              className="auth-button"
            >
              Войти
            </button>
            <span> или </span>
            <button 
              onClick={() => navigate("/register", { state: { from: location.pathname } })}
              className="auth-button"
            >
              Зарегистрироваться
            </button>
          </div>
        )}
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            {editingReviewId === review.id ? (
              <div className="edit-review-form">
                <textarea
                  className="edit-review-textarea"
                  value={editReviewText}
                  onChange={(e) => setEditReviewText(e.target.value)}
                />
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="editRating"
                          value={ratingValue}
                          onClick={() => setEditReviewRating(ratingValue)}
                        />
                        <FaStar
                          className="star"
                          color={ratingValue <= editReviewRating ? "#ffc107" : "#e4e5e9"}
                          size={25}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="edit-review-buttons">
                  <button type="button" className="save-edit-btn" onClick={handleUpdateReview}>
                    Сохранить
                  </button>
                  <button type="button" className="cancel-edit-btn" onClick={cancelEdit}>
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="review-header">
                  <h4>{review.name}</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    ))}
                  </div>
                  {currentUser?.uid === review.userId && (
                    <div className="review-actions">
                      <button
                        className="edit-review-btn"
                        onClick={() => handleEditReview(review)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-review-btn"
                        onClick={() => handleDeleteReview(review.id, review.userId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
                <p>{review.text}</p>
                <p className="review-date">
                  {new Date(review.date).toLocaleDateString("ru-RU")}
                  {review.edited && <span className="edited-badge">(изменено)</span>}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
