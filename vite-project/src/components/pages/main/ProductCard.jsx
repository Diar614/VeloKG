import React from 'react';
import { Link } from 'react-router-dom';
import "./productCard.css";

const ProductCard = ({ product, index }) => {
  const { bike1, bike2, bike3, bike4, id } = product;

  if (!bike1 && !bike2 && !bike3 && !bike4) return null;

  return (
    <div
      key={`${id}-${index}`}
      className="product-card-container"
    >
      {bike1 && (
        <div className="flex flex-col items-center product-card" key={`${id}-bike1`}>
          <Link to={`/product/${id}`} className="relative w-full group">
            <span className="absolute top-6 left-6 bg-black text-white text-sm font-bold px-3 py-2 rounded">
              Новое
            </span>
            <img
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              src={bike1.image || 'https://default-image-url.jpg'}
              alt={bike1.name}
            />
          </Link>
          <div className="p-6 bg-stone-100 w-full min-h-[250px]">
            <h1 className="text-2xl font-bold mb-4">{bike1.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{bike1.description}</p>
            <div className="mt-4">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-2 text-sm text-gray-600">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      )}

      {bike2 && (
        <div className="flex flex-col items-center product-card" key={`${id}-bike2`}>
          <Link to={`/product/${id}`} className="relative w-full group">
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              Новое
            </span>
            <img
              className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              src={bike2.image || 'https://default-image-url.jpg'}
              alt={bike2.name}
            />
          </Link>
          <div className="p-4 bg-stone-100 w-full min-h-[150px]">
            <h1 className="text-lg font-bold">{bike2.name}</h1>
            <p className="text-sm text-gray-600">{bike2.description}</p>
            <div className="mt-2">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-1 text-xs text-gray-600">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      )}

      {bike3 && (
        <div className="flex flex-col items-center product-card" key={`${id}-bike3`}>
          <Link to={`/product/${id}`} className="relative w-full group">
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              Новое
            </span>
            <img
              className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              src={bike3.image || 'https://default-image-url.jpg'}
              alt={bike3.name}
            />
          </Link>
          <div className="p-4 bg-stone-100 w-full min-h-[150px]">
            <h1 className="text-lg font-bold">{bike3.name}</h1>
            <p className="text-sm text-gray-600">{bike3.description}</p>
            <div className="mt-2">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-1 text-xs text-gray-600">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      )}

      {bike4 && (
        <div className="flex flex-col items-center product-card" key={`${id}-bike4`}>
          <Link to={`/product/${id}`} className="relative w-full group">
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 rounded">
              Новое
            </span>
            <img
              className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              src={bike4.image || 'https://default-image-url.jpg'}
              alt={bike4.name}
            />
          </Link>
          <div className="p-4 bg-stone-100 w-full min-h-[150px]">
            <h1 className="text-lg font-bold">{bike4.name}</h1>
            <p className="text-sm text-gray-600">{bike4.description}</p>
            <div className="mt-2">
              <input type="checkbox" id={`compare-${id}-${index}`} />
              <label htmlFor={`compare-${id}-${index}`} className="ml-1 text-xs text-gray-600">
                + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
