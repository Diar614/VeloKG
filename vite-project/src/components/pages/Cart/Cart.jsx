import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext"; 
import "../gravelBike/GravelProductBike.css"; 

const Cart = () => {
  const { cart } = useContext(CartContext); 

  console.log("Товары в корзине:", cart); // Логируем содержимое корзины

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <div className="product-card-container">
          {cart.map((item) => (
            <div key={item.id} className="product-card">
              <div className="relative w-full group">
                <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-lg">
                  В корзине
                </span>
                <img
                  className="w-full h-auto max-w-[600px] object-contain transition-transform duration-300 group-hover:scale-110 mx-auto"
                  src={item.image || "https://default-image-url.jpg"}
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              <div className="details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;