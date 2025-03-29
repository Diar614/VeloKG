import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "../CartContext/CartContext";
import 'swiper/css';

const ProductCard = ({ product }) => {
  const { id } = product;
  const { toggleFavorite, isFavorite, addToCart } = useCart();

  const bikes = [
    product.gravelBike1,
    product.gravelBike2,
    product.gravelBike3,
    product.gravelBike4,
    product.gravelBike5,
    product.gravelBike6,
  ]
  .filter(bike => bike && bike.name)
  .map((bike, index) => ({
    ...bike,
    uniqueId: `${id}-gravel-${index}`,
    productId: id,
    bikeIndex: index,
    bikeType: 'gravel'
  }));

  if (bikes.length === 0) return null;

  return (
    <div className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {bikes.map((bike, i) => (
          <motion.div
            key={bike.uniqueId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(bike);
              }}
              className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md transition-all ${
                isFavorite(bike.uniqueId) 
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-400 hover:text-red-500'
              }`}
              aria-label={isFavorite(bike.uniqueId) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(bike.uniqueId) ? (
                <HeartSolid className="h-6 w-6" />
              ) : (
                <HeartOutline className="h-6 w-6" />
              )}
            </button>

            
            <Link 
              to={`/product/${id}?bikeIndex=${i}&bikeType=gravel`}
              className="block relative pt-[70%] bg-gray-100 overflow-hidden"
            >
              
              <img
                className="absolute top-0 left-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                src={bike.image || "/placeholder-bike.jpg"}
                alt={bike.name}
                loading="lazy"
              />
            </Link>

            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{bike.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[3em]">{bike.description}</p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-blue-600">
                  {bike.price} сом
                </span>
                <Link 
                  to={`/product/${id}?bikeIndex=${i}&bikeType=gravel`}
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

export default ProductCard;