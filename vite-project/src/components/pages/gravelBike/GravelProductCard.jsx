import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const GravelProductCard = ({ product }) => {
  const { toggleFavorite, isFavorite } = useCart();

  const bikes = [
    product.gravelBike1, 
    product.gravelBike2,  
    product.gravelBike3, 
    product.gravelBike4, 
    product.gravelBike5,
    product.gravelBike6, 
  ]
    .filter(Boolean)
    .map((bike, index) => ({
      ...bike,
      uniqueId: `${product.id}-${index}`,
      productId: product.id,
      bikeIndex: index // Добавляем индекс для корректной работы ProductDetail
    }));

  if (bikes.length === 0) return null;

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {bikes.map((bike, i) => (
          <motion.div
            key={`${product.id}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            style={{ minHeight: '380px' }} // Уменьшенная высота карточки
          >
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(bike);
              }}
              className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all ${
                isFavorite(bike.uniqueId) 
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-400 hover:text-red-500'
              }`}
              aria-label={isFavorite(bike.uniqueId) ? "Удалить из избранного" : "Добавить в избранное"}
            >
              {isFavorite(bike.uniqueId) ? (
                <HeartSolid className="h-5 w-5" />
              ) : (
                <HeartOutline className="h-5 w-5" />
              )}
            </button>

            <Link 
              to={`/product/${product.id}?bikeIndex=${i}`}
              className="block relative pt-[80%] bg-gray-100 overflow-hidden"
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                src={bike.image || "/placeholder-bike.jpg"}
                alt={bike.name}
                loading="lazy"
              />
            </Link>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{bike.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">{bike.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                {bike.price && (
                  <span className="text-lg font-bold text-blue-600">
                    {bike.price} сом
                  </span>
                )}
                <Link 
                  to={`/product/${product.id}?bikeIndex=${i}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                >
                  Подробнее
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GravelProductCard;