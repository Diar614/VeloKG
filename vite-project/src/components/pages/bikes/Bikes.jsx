import { GlobeAltIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Bikes = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

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
      <div className="error">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (products === null) {
    return <div className="loading">Loading products...</div>;
  }


  const allBikes = products.flatMap(product => {
    const bikeTypes = [
      'gravelBike1', 'gravelBike2', 'gravelBike3', 
      'gravelBike4', 'gravelBike5', 'gravelBike6',
      'friradeBike', 'friradeBike1', 'friradeBike3', 'friradeBike4',
      'KidsBike1', 'KidsBike2', 'KidsBike3', 'KidsBike4', 'KidsBike5'
    ];

    return bikeTypes
      .filter(type => product[type])
      .map((type, index) => ({
        ...product[type],
        productId: product.id,
        bikeType: type,
        bikeIndex: index
      }));
  });

  if (allBikes.length === 0) {
    return (
      <div className="no-products">
        <h2>No bikes found</h2>
        <p>Please check back later or contact support</p>
      </div>
    );
  }

  return (
    <div className="all-products-container">
      <h1 className="all-products-title">All Bikes ({allBikes.length})</h1>
      
      <div className="products-grid">
        {allBikes.map((bike, index) => (
          <div key={`${bike.productId}-${bike.bikeType}-${index}`} className="product-card">
            <Link 
              to={`/product/${bike.productId}?bikeIndex=${bike.bikeIndex}`} 
              className="relative w-full group"
            >
              <span className="badge-new">New</span>
              <img
                className="product-image"
                src={bike.image || "/images/default-bike.jpg"}
                alt={bike.name || "Bike image"}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/default-bike.jpg";
                }}
              />
              <div className="product-details">
                <h2>{bike.name || "Unnamed Bike"}</h2>
                <p>{bike.description || bike.decription || "No description available"}</p>
                {bike.price && (
                  <p className="price">Price: {bike.price}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bikes;