import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const sortedOrders = savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(sortedOrders);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleBackToShop = () => {
    navigate('/');
  };

  const toggleOrderDetails = (orderId) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
    setConfirmDelete(null);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setConfirmDelete(null);
  };

  const handleDeleteAllOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
    setConfirmDelete(null);
  };

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="order-history-header">
          <h1>История заказов</h1>
        </div>
        <div className="empty-orders">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-container">
        <div className="order-history-header">
          <h1>История заказов</h1>
        </div>
        <div className="empty-orders">
          <p>У вас пока нет завершенных заказов</p>
          <button onClick={handleBackToShop} className="btn back-to-shop">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h1>История заказов</h1>
        <button 
          onClick={() => setConfirmDelete('all')}
          className="btn delete-all"
        >
          Удалить всю историю
        </button>
      </div>

      {confirmDelete === 'all' && (
        <div className="confirmation-dialog">
          <p>Вы уверены, что хотите удалить всю историю заказов?</p>
          <div className="confirmation-buttons">
            <button 
              onClick={handleDeleteAllOrders}
              className="btn confirm-delete"
            >
              Да, удалить
            </button>
            <button 
              onClick={() => setConfirmDelete(null)}
              className="btn cancel-delete"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className={`order-card ${selectedOrder === order.id ? 'expanded' : ''}`}
          >
            <div 
              className="order-header"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div className="order-id">Заказ #{order.id}</div>
              <div className="order-date">{formatDate(order.date)}</div>
              <div className="order-status">Завершен</div>
              <div className="order-total">{formatPrice(order.total)} сом</div>
            </div>
            
            {selectedOrder === order.id && (
              <div className="order-details">
                <div className="section">
                  <h3>Товар</h3>
                  <div className="product-info">
                    <img 
                      src={order.bike.image} 
                      alt={order.bike.name}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                      }}
                    />
                    <div className="product-text">
                      <h4>{order.bike.name}</h4>
                      <p>Цена: {formatPrice(order.bike.price)} сом</p>
                      {order.selectedSize && <p>Размер рамы: {order.selectedSize}</p>}
                      <p>Размер колеса: {order.selectedWheelSize}</p>
                    </div>
                  </div>
                </div>
                
                <div className="section">
                  <h3>Доставка</h3>
                  <div className="detail-row">
                    <span className="detail-label">Способ:</span>
                    <span className="detail-value">{order.delivery.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Стоимость:</span>
                    <span className="detail-value">{formatPrice(order.delivery.price)} сом</span>
                  </div>
                  {order.delivery.type !== 'pickup' && (
                    <div className="detail-row">
                      <span className="detail-label">Адрес:</span>
                      <span className="detail-value">{order.customer.address}</span>
                    </div>
                  )}
                </div>
                
                <div className="section">
                  <h3>Оплата</h3>
                  <div className="detail-row">
                    <span className="detail-label">Способ:</span>
                    <span className="detail-value">
                      {order.paymentMethod === 'cash' && 'Наличными при получении'}
                      {order.paymentMethod === 'card' && 'Картой онлайн'}
                      {order.paymentMethod === 'transfer' && 'Банковский перевод'}
                    </span>
                  </div>
                  {order.coupon && (
                    <div className="detail-row">
                      <span className="detail-label">Купон:</span>
                      <span className="coupon-value">
                        {order.coupon.name} (-{formatPrice(order.coupon.discount)} сом)
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="section">
                  <h3>Контактные данные</h3>
                  <div className="detail-row">
                    <span className="detail-label">Имя:</span>
                    <span className="detail-value">{order.customer.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Телефон:</span>
                    <span className="detail-value">{order.customer.phone}</span>
                  </div>
                  {order.customer.comment && (
                    <div className="detail-row">
                      <span className="detail-label">Комментарий:</span>
                      <span className="detail-value">{order.customer.comment}</span>
                    </div>
                  )}
                </div>

                <div className="order-actions">
                  {confirmDelete === order.id ? (
                    <div className="confirmation-dialog">
                      <p>Удалить этот заказ?</p>
                      <div className="confirmation-buttons">
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="btn confirm-delete"
                        >
                          Да, удалить
                        </button>
                        <button 
                          onClick={() => setConfirmDelete(null)}
                          className="btn cancel-delete"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(order.id);
                      }}
                      className="btn delete-order"
                    >
                      Удалить заказ
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button onClick={handleBackToShop} className="btn back-to-shop">
        Вернуться в магазин
      </button>
    </div>
  );
};

export default OrderHistory;