import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { useCart } from "../CartContext/CartContext";

const KidsProductCard = ({ product }) => {
  const { toggleFavorite, isFavorite, addToCart } = useCart();

  const bikes = [
    product.KidsBike1,
    product.KidsBike2,
    product.KidsBike3,
    product.KidsBike4,
  ]
    .filter(bike => bike?.name)
    .map((bike, index) => ({
      ...bike,
      uniqueId: `${product.id}-kids-${index}`,
      productId: product.id,
      bikeIndex: index,
      bikeType: "kids",
      ageRange: bike.ageRange || "4-8 лет",
      wheelSize: bike.wheelSize || "20 дюймов"
    }));

  if (bikes.length === 0) return null;

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {bikes.map((bike) => (
          <motion.div
            key={bike.uniqueId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            whileHover={{ y: -2 }}
          >
            <div className="relative">
            
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(bike);
                }}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  isFavorite(bike.uniqueId) 
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-400'
                }`}
              >
                {isFavorite(bike.uniqueId) ? (
                  <HeartSolid className="h-4 w-4" />
                ) : (
                  <HeartOutline className="h-4 w-4" />
                )}
              </button>

              <Link 
                to={`/product/${product.id}?bikeIndex=${bike.bikeIndex}&bikeType=kids`}
                className="block pt-[70%] relative bg-gray-50"
              >
                <img
                  className="absolute top-0 left-0 w-full h-full object-contain p-2"
                  src={bike.image || "/placeholder-bike.jpg"}
                  alt={bike.name}
                  loading="lazy"
                />
              </Link>
            </div>

            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-1">{bike.name}</h3>
              
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                  {bike.ageRange}
                </span>
                <span className="text-xs bg-gray-50 text-gray-700 px-1.5 py-0.5 rounded">
                  {bike.wheelSize}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">
                  {bike.price} сом
                </span>
                
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(bike);
                    }}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                  >
                    Купить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KidsProductCard;