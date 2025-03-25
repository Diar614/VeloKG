import React from "react";
import { Link } from "react-router-dom";

const FreerideProductCard = ({ product, onAddToCart }) => {
  const bikes = [
    product.friradeBike,
    product.friradeBike1,
    product.friradeBike3,
    product.friradeBike4,
  ].filter(Boolean); 

  if (bikes.length === 0) return null;

  return (
    <div className="product-card-container">
      {bikes.map((bike, i) => (
        <div key={`${product.id}-${i}`} className="product-card">
          <Link to={`/product/${product.id}?bikeIndex=${i}`} className="relative w-full group">
            <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-lg">
              Новое
            </span>
            <img
              className="w-full h-auto max-w-[600px] object-contain transition-transform duration-300 mx-auto"
              src={bike.image || "https://via.placeholder.com/600"} 
              alt={bike.name}
              loading="lazy"
            />
          </Link>
          <div className="details">
            <h2>{bike.name}</h2>
            <p>{bike.description}</p>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id={`compare-${product.id}-${i}`}
                onChange={() => onAddToCart(bike)} 
              />
              <label htmlFor={`compare-${product.id}-${i}`} className="ml-2 text-sm text-gray-700">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreerideProductCard;