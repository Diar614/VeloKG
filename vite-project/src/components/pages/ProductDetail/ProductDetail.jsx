import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from "../product-slice.js/productd-slice";  

const ProductDetail = () => {
  const { productId } = useParams(); 
  const { products, isFetch, getAllProduct } = useProduct();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    console.log(`Полученный productId: ${productId}`); 
    console.log("Продукты:", products); 

    if (products.length === 0) {
      getAllProduct();
    }

    const product = products.find(item => item.id === productId);
    
    if (!product) {
      console.log(`Товар с id ${productId} не найден`); 
    }

    setProductDetails(product);
  }, [productId, products, getAllProduct]);

  if (isFetch) {
    return <h1 className="text-center text-2xl font-bold mt-10">Loading...</h1>;
  }

  if (!productDetails) {
    return <h1 className="text-center text-2xl font-bold mt-10">Товар не найден</h1>;
  }

  const { bike, name, description } = productDetails;

  return (
    <div className="product-detail">
      <h1 className="text-3xl font-bold text-center">Подробное описание товара</h1>
      <div className="max-w-4xl mx-auto mt-10">
        <img
          className="w-full h-auto object-cover"
          src={bike ? bike[Object.keys(bike)[0]] : ''}
          alt={name ? name : "Product Image"}
        />
        <h2 className="text-2xl font-semibold mt-4">{name}</h2>
        <p className="text-lg mt-2">{description}</p>
   
      </div>
    </div>
  );
};

export default ProductDetail;
