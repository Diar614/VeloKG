import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import jg1 from "../../../img/jg1.svg";

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
      navigate("/main");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg p-8 w-full md:w-[1000px] md:h-[700px]">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={jg1}
              alt="Illustration of cards"
              className="w-[90%] md:w-auto h-auto max-w-[450px] object-contain"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Регистрация</h2>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gray-50">
              <div className="form-group">
                <label className="block text-gray-700 text-lg">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Введите ваш email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700 text-lg">Пароль:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Введите ваш пароль"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition ease-in-out"
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
