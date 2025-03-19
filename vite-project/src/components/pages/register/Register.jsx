import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
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
          <h2 className="text-5xl font-bold mb-10 text-gray-800">
            Регистрация
          </h2>

          {error && (
            <div className="text-red-500 mb-6 text-lg">{error}</div>
          )}

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
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-6">
            <p className="text-lg text-gray-700">
              У вас уже есть аккаунт?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Войти
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
