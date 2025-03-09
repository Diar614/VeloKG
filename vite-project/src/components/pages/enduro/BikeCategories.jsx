import React from "react";
import { motion } from "framer-motion";

const BikeCategories = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="pt-20 px-[20%]"
    >
      <h1 className="text-center text-5xl max-w-2xl mx-auto">
        Исследуйте наши эндуро-велосипеды
      </h1>
      <div className="pt-10 flex justify-center space-x-4 pb-25">
        <div className="relative group">
          <img
            src="https://bikes.com/cdn/shop/collections/ALN-rocky-mountain-altitude.jpg?v=1712755495&width=800"
            alt=""
            className="w-[800px] h-[480px] transition-transform duration-500 ease-out transform group-hover:scale-105 cursor-pointer"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
            Высота над уровнем моря
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://bikes.com/cdn/shop/collections/rocky-mountain-altitude-powerplay-models.jpg?v=1682367308&width=800"
            alt=""
            className="w-[800px] h-[480px] transition-transform duration-500 ease-out transform group-hover:scale-105 cursor-pointer"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
            Мощная игра на высоте
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BikeCategories;
