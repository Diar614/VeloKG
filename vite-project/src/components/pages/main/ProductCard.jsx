import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";

const ProductCard = ({ product, index }) => {
  const { id } = product;

 
  const bikes = [
    product.gravelBike1,
    product.gravelBike2,
    product.gravelBike3,
    product.gravelBike4,
    product.gravelBike5,
    product.gravelBike6,
  ].filter(Boolean); 

 
  if (bikes.length === 0) return null;

  return (
    <div className="product-card-container">
      {bikes.map((bike, i) => (
        <div key={`${id}-${i}`} className="flex flex-col items-center product-card">
          <Link to={`/product/${id}?bikeIndex=${i}`} className="relative w-full group">
            <span className="absolute top-6 left-6 bg-black text-white text-sm font-bold px-3 py-2 rounded">
              Новое
            </span>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              src={bike.image || "https://default-image-url.jpg"}
              alt={bike.name}
            />
          </Link>
          <div className="p-6 bg-stone-100 w-full min-h-[250px]">
            <h1 className="text-2xl font-bold mb-4">{bike.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{bike.description}</p>
            <div className="mt-4">
              <input type="checkbox" id={`compare-${id}-${i}`} />
              <label htmlFor={`compare-${id}-${i}`} className="ml-2 text-sm text-gray-600">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;





