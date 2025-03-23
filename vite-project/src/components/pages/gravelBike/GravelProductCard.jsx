import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./GravelProductBike.css";

const GravelProductCard = ({ product }) => {


  const bikes = [
    product.gravelBike1,
    product.gravelBike2,
    product.gravelBike3,
    product.gravelBike4,
    product.gravelBike5,
    product.gravelBike6,
  ].filter(Boolean);

  if (bikes.length === 0) return null;

  console.log("Product ID in GravelProductCard:", product.id);

  return (
    <div className="product-card-container">
      {bikes.map((bike, i) => (
        <div key={`${product.id}-${i}`} className="product-card">
          <Link to={`/product/${product.id}?bikeIndex=${i}`} className="relative w-full group">
            <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-lg">
              Новое
            </span>
            <img
              className="w-full h-auto max-w-[600px] object-contain transition-transform duration-300 group-hover:scale-110 mx-auto"
              src={bike.image || "https://default-image-url.jpg"}
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
                onChange={() => addToCart(bike)}
              />
              <label htmlFor={`compare-${product.id}-${i}`} className="ml-2 text-sm text-gray-700">
                + ДОБАВИТЬ В КАРЗИНУ
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GravelProductCard;