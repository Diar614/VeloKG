import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bikeIndex = parseInt(searchParams.get("bikeIndex"), 10);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", text: "", rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (!id) {
      setError("Продукт с таким ID не существует");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          setProduct({
            id: productSnap.id,
            ...data,
            bikes: [
              data.gravelBike1,
              data.gravelBike2,
              data.gravelBike3,
              data.gravelBike4,
              data.gravelBike5,
              data.gravelBike6,
            ].filter(Boolean),
          });
        } else {
          setError("Продукт с таким ID не существует");
        }
      } catch (err) {
        setError("Ошибка при загрузке продукта");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (!id || bikeIndex === undefined) return;

    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("productId", "==", id), where("bikeIndex", "==", bikeIndex));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [id, bikeIndex]); // Добавляем bikeIndex в зависимости

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewForm.name || !reviewForm.text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId: id,
        bikeIndex: bikeIndex, // Добавляем bikeIndex
        name: reviewForm.name,
        text: reviewForm.text,
        rating: reviewForm.rating,
        date: new Date().toISOString(),
      });

      setReviewForm({ name: "", text: "", rating: 0 });
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product || !product.bikes || product.bikes.length === 0) {
    return <div>Данные о велосипедах отсутствуют.</div>;
  }

  const bike = product.bikes[bikeIndex];

  if (!bike) {
    return <div>Велосипед не найден.</div>;
  }

  const sizes = ["SM", "MD", "LG", "XL"];

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <h1>{bike.name}</h1>
      </div>
      <div className="product-detail-content">
        <div className="product-detail-images">
          <div className="product-detail-main-image">
            <img src={bike.image} alt={bike.name} />
          </div>
        </div>
        <div className="product-detail-info">
          <h2>{bike.name}</h2>
          <p className="price">Цена: {bike.price} сом</p>
          <p className="description">{bike.description}</p>

          <div className="size-options">
            <h3>Выберите размер:</h3>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-cart">Добавить в корзину</button>
        </div>
      </div>

      <div className="review-form">
        <h3>Оставьте отзыв</h3>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Ваше имя"
            value={reviewForm.name}
            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Ваш отзыв"
            value={reviewForm.text}
            onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
            required
          />
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setReviewForm({ ...reviewForm, rating: ratingValue })}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hoverRating || reviewForm.rating) ? "#ffc107" : "#e4e5e9"}
                    size={30}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                </label>
              );
            })}
          </div>
          <button type="submit">Отправить отзыв</button>
          
        </form>
      </div>

      <div className="reviews-list">
        <h3>Отзывы</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h4>{review.name}</h4>
              <p>{review.text}</p>
              <p>Оценка: {"★".repeat(review.rating)}</p>
              <p>{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>Пока нет отзывов.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;