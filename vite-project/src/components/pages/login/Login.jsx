import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // импортируем конфигурацию Firebase
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");  // Состояние для email для восстановления
  const [resetError, setResetError] = useState("");  // Ошибка при восстановлении пароля
  const [isResetMode, setIsResetMode] = useState(false);  // Режим восстановления пароля
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Аккаунт с таким email не найден.");
      } else if (err.code === "auth/wrong-password") {
        setError("Неверный пароль.");
      } else {
        setError("Произошла ошибка. Попробуйте снова.");
      }
      console.error(err);
    }
  };

  const handlePasswordReset = async () => {
    setResetError(""); // очищаем предыдущие ошибки

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Ссылка для сброса пароля отправлена на ваш email.");
      setIsResetMode(false); // возвращаем на форму входа
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setResetError("Неверный email.");
      } else {
        setResetError("Ошибка при отправке ссылки для сброса пароля.");
      }
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-16 w-full max-w-2xl flex flex-col items-center text-center mx-auto">
          <h2 className="text-5xl font-bold mb-10 text-gray-800">{isResetMode ? "Восстановление пароля" : "Вход"}</h2>

          {error && (
            <div className="text-red-500 mb-6 text-lg">{error}</div>
          )}

          {resetError && (
            <div className="text-red-500 mb-6 text-lg">{resetError}</div>
          )}

          {isResetMode ? (
            <div>
              <div>
                <label className="block text-gray-800 text-xl mb-2">Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder="Введите ваш email для восстановления пароля"
                  className="w-full p-5 border border-gray-400 rounded-xl text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-center"
                />
              </div>
              <button
                onClick={handlePasswordReset}
                className="w-full bg-blue-500 text-white py-3 rounded-xl text-xl font-semibold hover:bg-blue-600 transition ease-in-out mt-6"
              >
                Отправить ссылку для сброса пароля
              </button>
              <div className="mt-6">
                <p
                  onClick={() => setIsResetMode(false)}
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                >
                  Уже есть аккаунт? Войти
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg">
              <div>
                <label className="block text-gray-800 text-xl mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Введите ваш email"
                  className="w-full p-5 border border-gray-400 rounded-xl text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-center"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-xl mb-2">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Введите ваш пароль"
                  className="w-full p-5 border border-gray-400 rounded-xl text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-xl text-xl font-semibold hover:bg-blue-600 transition ease-in-out"
              >
                Войти
              </button>
            </form>
          )}

          {!isResetMode && (
            <div className="mt-6">
              <p className="text-lg text-gray-700">
                Нет аккаунта?
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                >
                  Зарегистрироваться
                </span>
              </p>
              <p
                onClick={() => setIsResetMode(true)}
                className="text-blue-500 cursor-pointer hover:text-blue-600 mt-4"
              >
                Забыли пароль?
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
