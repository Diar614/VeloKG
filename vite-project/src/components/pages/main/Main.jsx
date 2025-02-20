import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { useProduct } from "../productd-slice.js/productd-slice";
import brand1 from "../../../img/brand1.svg";
import brand2 from "../../../img/brand2.svg";
import brand3 from "../../../img/brand3.svg";
import brand4 from "../../../img/brand4.svg";
import brand5 from "../../../img/brand5.svg";
import brand6 from "../../../img/brand6.svg";

const Main = () => {
  const { products, isFetch, getAllProduct } = useProduct();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://bikes.com/cdn/shop/files/RM_2025_Website_CollectionHero_Element_Action_v2_1.jpg?v=1726247080&width=2000",
    "https://bikes.com/cdn/shop/collections/Web_Element1_MRiga_BritishColumbia-06.jpg?v=1717782648&width=2000",
  ];

  useEffect(() => {
    getAllProduct();

    const handleScroll = () => {
      const image = document.querySelector("img.w-full.h-auto");
      if (!image) return;
      const rect = image.getBoundingClientRect();
      setHeaderVisible(rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isFetch) {
    return <h1 className="text-center text-2xl font-bold mt-10">Loading...</h1>;
  }

  return (
    <div className="w-full h-full relative">
      <SearchSidebar
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
      />
      <div className="relative z-10">
        <Header
          isSearchVisible={isSearchVisible}
          setSearchVisible={setSearchVisible}
          isHeaderVisible={isHeaderVisible}
        />
        <img
          className="w-full h-auto"
          src={slides[currentSlide]}
          alt="Slider"
        />
      </div>
      <div
        style={{ "--background": "38 32 32", "--text-color": "229 229 229" }}
        className="bg-[rgb(var(--background))] text-[rgb(var(--text-color))] p-8 text-center"
      >
        <h1 className="text-7xl pt-32 font-bold">Будь в своей Стихии.</h1>
        <h1 className="max-w-3xl mx-auto mt-6 text-xl">
          Модель Element, разработанная для достижения идеального баланса между
          лёгкостью, эффективностью при беге по пересечённой местности и
          технической точностью, — это лучшее из возможного.
        </h1>
        <div className="flex justify-center items-center space-x-40 text-4xl mt-10 pb-30 pt-10">
          <div className="flex flex-col items-center">
            <h1>Пересеченная местность</h1>
            <p className="text-3xl text-gray-400 mt-2">Предназначен для</p>
          </div>

          <h1 className="text-5xl text-gray-500"></h1>

          <div className="flex flex-col items-center">
            <h1>130/120</h1>
            <p className="text-4xl text-gray-400 mt-2">Ход (мм)</p>
          </div>

          <h1 className="text-5xl text-gray-500"></h1>

          <div className="flex flex-col items-center">
            <h1>29, 27.5</h1>
            <p className="text-3xl text-gray-400 mt-2">Размер колеса</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-24">
        {[brand1, brand2, brand3, brand4, brand5, brand6].map(
          (brand, index) => (
            <img key={index} src={brand} alt={`Brand ${index + 1}`} />
          )
        )}
      </div>
      <h1 className="text-5xl font-thin">НОВИНКИ</h1>

      <div className="product-list grid grid-cols-5 gap-6 p-8">
        {products.map((product) => {
          const { bike, name } = product;
          if (!bike) return null;
          return Object.keys(bike).map((key, index) => (
            <div
              key={`${product.id}-${key}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4 flex flex-col items-center">
                <img
                  className="w-56 h-56 object-cover mb-2"
                  src={bike[key]}
                  alt={name?.[`${key}name`] || `Bike ${index + 1}`}
                />
                <h1 className="text-xl font-bold mt-2 text-center">
                  {name?.[`${key}name`] || `Bike ${index + 1}`}
                </h1>
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Main;
