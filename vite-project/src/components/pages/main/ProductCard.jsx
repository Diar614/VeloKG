// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const { bike1, bike2, id } = product;

  if (!bike1 && !bike2) return null;

  return (
    <div
      key={`${id}-${index}`}
      className="bg-white shadow-md rounded-md overflow-hidden mx-2  "
    >
      {bike1 && (
        <>
          <Link to={`/product/${id}`} className="relative">
            <span className="absolute top-1 left-1 bg-black text-white text-xs font-bold px-1 py-0.5 rounded">
              Новое
            </span>
            <img
              className="w-140 h-85 object-cover"
              src={bike1.image || 'https://default-image-url.jpg'}
              alt={bike1.name}
            />
          </Link>
          <div className="p-4 bg-stone-200">
            <h1 className="text-sm font-bold">{bike1.name}</h1>
            <p>{bike1.description}</p>
            <div className="mt-2">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-1 text-2xs">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </>
      )}

      {bike2 && (
        <>
          <Link to={`/product/${id}`} className="relative">
            <span className="absolute top-1 left-1 bg-black text-white text-xs font-bold px-1 py-0.5 rounded">
              Новое
            </span>
            <img
              className="w-140 h-85 object-cover"
              src={bike2.image || 'https://default-image-url.jpg'}
              alt={bike2.name}
            />
          </Link>
          <div className="p-4 bg-stone-200">
            <h1 className="text-sm font-bold">{bike2.name}</h1>
            <p>{bike2.description}</p>
            <div className="mt-2">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-1 text-2xs">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
