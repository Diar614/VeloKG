import React, { useState, useEffect } from 'react';
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
  
  
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '', address: '' });
  

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const deliveryOptions = {
    standard: { price: 200, days: 3, name: 'Стандартная' },
    express: { price: 500, days: 1, name: 'Экспресс' },
    pickup: { price: 0, days: 0, name: 'Самовывоз' }
  };
  

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(null);
  const [couponError, setCouponError] = useState('');
  
  const validCoupons = {
    'SALE10': { discount: 10, type: 'percent', name: 'Скидка 10%' },
    'BIKE20': { discount: 20, type: 'percent', name: 'Скидка 20%' },
    'FIXED50': { discount: 50, type: 'fixed', name: 'Скидка 50 сом' },
    'FREESHIP': { discount: 200, type: 'fixed', name: 'Бесплатная доставка', freeShipping: true }
  };


  const [paymentMethod, setPaymentMethod] = useState('cash');
  
 
  const [inStock, setInStock] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);


  const handleBackToShop = () => {
    navigate('/');
  };


  useEffect(() => {
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    
   
    const checkStock = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setInStock(Math.random() > 0.1); 
    };
    checkStock();
  }, []);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [step]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('checkoutFormData', JSON.stringify(newFormData));
  };


  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', address: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
      valid = false;
    }

    if (!formData.phone.trim() || !/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный телефон';
      valid = false;
    }

    if (!formData.address.trim() && deliveryOption !== 'pickup') {
      newErrors.address = 'Введите адрес';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const applyCoupon = () => {
    const coupon = validCoupons[couponCode.toUpperCase()];
    
    if (coupon) {
      setDiscount(coupon);
      setCouponError('');
 if (coupon.freeShipping) {
        setDeliveryOption('standard');
      }
    } else {
      setDiscount(null);
      setCouponError('Неверный купон');
    }
  };


  const removeCoupon = () => {
    setDiscount(null);
    setCouponCode('');
    setCouponError('');
  };


  const getDeliveryPrice = () => {
    if (discount?.freeShipping) {
      return 0;
    }
    return deliveryOptions[deliveryOption].price;
  };


  const calculateDiscountAmount = () => {
    if (!discount) return 0;
    
    if (discount.type === 'percent') {
      return bike.price * discount.discount / 100;
    } else {
      return discount.discount;
    }
  };


  const calculateTotal = () => {
    const bikePrice = Number(bike.price);
    const deliveryPrice = Number(getDeliveryPrice());
    const discountAmount = Number(calculateDiscountAmount());
    
    let subtotal = bikePrice + deliveryPrice - discountAmount;
    

    return Math.max(subtotal, 0);
  };

  const totalPrice = calculateTotal();
  const deliveryPrice = getDeliveryPrice();
  const discountAmount = calculateDiscountAmount();


  const generateOrderNumber = () => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  };

 
  const calculateDeliveryDate = (deliveryDays) => {
    const date = new Date();
    let daysAdded = 0;
    
    while (daysAdded < deliveryDays) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;
    


    setIsSubmitting(true);
    
    try {
   
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = {
        id: generateOrderNumber(),
        date: new Date().toISOString(),
        bike,
        selectedSize,
        selectedWheelSize,
        customer: formData,
        delivery: {
          ...deliveryOptions[deliveryOption],
          price: deliveryPrice,
          type: deliveryOption
        },
        paymentMethod,
        coupon: discount ? {
          code: couponCode,
          name: discount.name,
          discount: discountAmount
        } : null,
        total: totalPrice
      };

     const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      setOrderNumber(order.id);
      setDeliveryDate(calculateDeliveryDate(deliveryOptions[deliveryOption].days));
      setStep(2);
      localStorage.removeItem('checkoutFormData');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bike) {
    return (
      <div className="checkout-container">
        <div className="error-message fade-in">
          <h2>Ошибка: данные о велосипеде не найдены</h2>
          <button onClick={handleBackToShop} className="btn back-to-shop">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  if (!inStock) {
    return (
      <div className="checkout-container">
        <div className="stock-warning fade-in">
          <h2>Этот товар временно отсутствует на складе</h2>
          <p>Мы можем уведомить вас, когда он появится в наличии</p>
          <button onClick={handleBackToShop} className="btn back-to-shop">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Оформление заказа</h1>
        <div className="progress-steps">
          {[1, 2].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`step ${step >= stepNum ? 'active' : ''}`}>
                <div className="step-number">{stepNum}</div>
                <div className="step-title">
                  {stepNum === 1 ? 'Данные покупателя' : 'Подтверждение'}
                </div>
              </div>
              {stepNum < 2 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className={`checkout-content ${isAnimating ? 'fade-in' : ''}`}>
        {step === 1 ? (
          <>
            <div className="order-summary card">
              <h2>Ваш заказ</h2>
              <div className="product-image-container">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/600x400?text=Изображение+не+загружено';
                  }}
                />
              </div>
              <div className="order-details">
                <h3>{bike.name}</h3>
                <p>Цена: {bike.price} сом</p>
                <p>Размер колеса: {selectedWheelSize}</p>
                {selectedSize && <p>Размер рамы: {selectedSize}</p>}
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Товар:</span>
                    <span>{bike.price} сом</span>
                  </div>
                  <div className="price-row">
                    <span>Доставка:</span>
                    <span>
                      {deliveryPrice} сом ({deliveryOptions[deliveryOption].name})
                    </span>
                  </div>
                  {discount && (
                    <div className="price-row discount">
                      <span>Скидка:</span>
                      <span>-{discountAmount} сом ({discount.name})</span>
                    </div>
                  )}
                  <div className="price-row total">
                    <span>Итого:</span>
                    <span>{totalPrice} сом</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form card">
              <h2>Контактные данные</h2>
              
              <div className="form-group">
                <label>Имя:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Телефон:</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Способ доставки:</label>
                <div className="select-wrapper">
                  <select 
                    value={deliveryOption}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    disabled={discount?.freeShipping}
                  >
                    {Object.entries(deliveryOptions).map(([value, option]) => (
                      <option key={value} value={value}>
                        {option.name} ({option.price} сом, {option.days} дн.)
                      </option>
                    ))}
                  </select>
                </div>
                {discount?.freeShipping && (
                  <p className="info-text">Бесплатная доставка применена по купону</p>
                )}
              </div>

              {deliveryOption !== 'pickup' && (
                <div className="form-group">
                  <label>Адрес доставки:</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
              )}

              <div className="form-group">
                <label>Способ оплаты:</label>
                <div className="payment-options">
                  {['cash', 'card', 'transfer'].map((method) => (
                    <label key={method} className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                      />
                      <span className="payment-label">
                        {method === 'cash' && 'Наличными при получении'}
                        {method === 'card' && 'Онлайн картой'}
                        {method === 'transfer' && 'Банковский перевод'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="coupon-section">
                <label>Купон на скидку:</label>
                {discount ? (
                  <div className="coupon-applied">
                    <span>{discount.name}</span>
                    <button 
                      type="button" 
                      onClick={removeCoupon}
                      className="btn remove-coupon"
                    >
                      Удалить
                    </button>
                  </div>
                ) : (
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Введите код купона"
                    />
                    <button 
                      type="button" 
                      onClick={applyCoupon}
                      className="btn apply-coupon"
                    >
                      Применить
                    </button>
                  </div>
                )}
                {couponError && <div className="error-message">{couponError}</div>}
              </div>

              <div className="form-group">
                <label>Комментарий к заказу:</label>
                <textarea 
                  name="comment" 
                  value={formData.comment} 
                  onChange={handleChange} 
                  placeholder="Дополнительные пожелания"
                />
              </div>

              <button 
                type="submit" 
                className="btn submit-order" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Обработка...
                  </>
                ) : 'Подтвердить заказ'}
              </button>
            </form>
          </>
        ) : (
          <div className="confirmation card">
            <div className="confirmation-icon">✓</div>
            <h2>Заказ успешно оформлен!</h2>
            
            <div className="order-info">
              <div className="info-row">
                <span>Номер заказа:</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="info-row">
                <span>Дата доставки:</span>
                <strong>{deliveryDate}</strong>
              </div>
              <div className="info-row">
                <span>Способ оплаты:</span>
                <strong>
                  {paymentMethod === 'cash' && 'Наличными'}
                  {paymentMethod === 'card' && 'Картой онлайн'}
                  {paymentMethod === 'transfer' && 'Банковский перевод'}
                </strong>
              </div>
              <div className="info-row">
                <span>Итого к оплате:</span>
                <strong>{totalPrice} сом</strong>
              </div>
            </div>
            
            <div className="section">
              <h3>Детали заказа</h3>
              <div className="product-image-container">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/600x400?text=Изображение+не+загружено';
                  }}
                />
              </div>
              <p>{bike.name} ({selectedWheelSize})</p>
              {selectedSize && <p>Размер рамы: {selectedSize}</p>}
              <p>Доставка: {deliveryPrice} сом ({deliveryOptions[deliveryOption].name})</p>
              {discount && <p>Применен купон: {discount.name} (-{discountAmount} сом)</p>}
            </div>
            
            <div className="section">
              <h3>Данные покупателя</h3>
              <p>{formData.name}</p>
              <p>{formData.phone}</p>
              {deliveryOption !== 'pickup' && <p>{formData.address}</p>}
              {formData.comment && <p>Комментарий: {formData.comment}</p>}
            </div>
            <button 
  onClick={() => navigate('/orders')} 
  className="btn view-orders"
>
  Посмотреть историю заказов
</button>
            <button onClick={handleBackToShop} className="btn back-to-shop">
              Вернуться в магазин
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
