import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { useCart } from "../CartContext/CartContext";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Bikes.css";

const Bikes = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = [];
      
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (products === null) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  const allBikes = products.flatMap(product => {
    const bikeTypes = [
      'gravelBike1', 'gravelBike2', 'gravelBike3', 
      'gravelBike4', 'gravelBike5', 'gravelBike6',
      'friradeBike', 'friradeBike1', 'friradeBike3', 'friradeBike4',
      'KidsBike1', 'KidsBike2', 'KidsBike3', 'KidsBike4'
    ];

    return bikeTypes
      .filter(type => product[type])
      .map((type, index) => ({
        ...product[type],
        productId: product.id,
        bikeType: type,
        bikeIndex: index,
        uniqueId: `${product.id}-${type}-${index}`
      }));
  });

  if (allBikes.length === 0) {
    return (
      <div className="no-products-found">
        <h2>No bikes found</h2>
        <p>Please check back later or contact support</p>
      </div>
    );
  }

  return (
    <div className="bikes-container">
      <div className="bikes-header">
        <h1>Все велосипеды <span>({allBikes.length})</span></h1>
      </div>
      
      <div className="bikes-grid">
        {allBikes.map((bike, index) => (
          <motion.div
            key={bike.uniqueId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bike-card"
            whileHover={{ y: -5 }}
          >
            <div className="card-badge">NEW</div>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(bike);
              }}
              className={`favorite-button ${
                isFavorite(bike.uniqueId) ? 'favorited' : ''
              }`}
              aria-label={isFavorite(bike.uniqueId) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(bike.uniqueId) ? (
                <HeartSolid className="heart-icon" />
              ) : (
                <HeartOutline className="heart-icon" />
              )}
            </button>

            <Link 
              to={`/product/${bike.productId}?bikeIndex=${bike.bikeIndex}`} 
              className="bike-image-link"
            >
              <img
                className="bike-image"
                src={bike.image || "/images/default-bike.jpg"}
                alt={bike.name || "Bike image"}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/default-bike.jpg";
                }}
              />
            </Link>

            <div className="bike-details">
              <h2>{bike.name || "Unnamed Bike"}</h2>
              <p className="bike-description">
                {bike.description || bike.decription || "No description available"}
              </p>
              
              <div className="bike-footer">
                {bike.price && (
                  <p className="bike-price">{bike.price} сом</p>
                )}
                
                <div className="bike-actions">

                  
                  <Link
                    to={`/product/${bike.productId}?bikeIndex=${bike.bikeIndex}`}
                    className="view-details"
                  >
                    Детали
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Bikes;