import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bike, selectedSize, selectedWheelSize } = location.state || {};
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки заказа
    console.log('Order submitted:', { bike, selectedSize, selectedWheelSize, formData });
    alert('Ваш заказ успешно оформлен!');
    navigate('/');
  };

  if (!bike) {
    return <div className="checkout-container">Ошибка: данные о велосипеде не найдены</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Оформление заказа</h1>
      </div>
      
      <div className="order-summary">
        <h2>Ваш заказ</h2>
        <img src={bike.image} alt={bike.name} />
        <div className="order-details">
          <h3>{bike.name}</h3>
          <p className="price">Цена: {bike.price} сом</p>
          <p>Размер колеса: {selectedWheelSize}</p>
          {selectedSize && <p>Размер рамы: {selectedSize}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Контактные данные</h2>
        
        <div className="form-group">
          <label>Имя:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Адрес доставки:</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Комментарий к заказу:</label>
          <textarea 
            name="comment" 
            value={formData.comment} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="submit-order">Подтвердить заказ</button>
      </form>
    </div>
  );
};

export default Checkout;