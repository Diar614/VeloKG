

import React from "react";
import { useContext } from "react";
import CartContext from "../CartContext/CartContext"; 
const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext); 

  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
