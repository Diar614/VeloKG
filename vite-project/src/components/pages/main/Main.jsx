import React, { useState, useEffect } from "react";
import jg1 from "../../../img/jg1.svg";
import jg2 from "../../../img/jg2.jpg";
import jg3 from "../../../img/jg3.jpg";
import brand1 from "../../../img/brand1.svg";
import brand2 from "../../../img/brand2.svg";
import brand3 from "../../../img/brand3.svg";
import brand4 from "../../../img/brand4.svg";
import brand5 from "../../../img/brand5.svg";
import brand6 from "../../../img/brand6.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Header from "../Header";
import { useProduct } from "../productd-slice.js/productd-slice";

const Main = () => {
  const { products, isFetch, getAllProduct } = useProduct();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const slides = [jg1, jg2, jg3];

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  if (isFetch) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="relative z-10">
        <Header
          isSearchVisible={isSearchVisible}
          setSearchVisible={setSearchVisible}
        />
        {isSearchVisible && (
          <div className="fixed top-20 left-[70%] z-50">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                className="p-3 w-[350px] bg-black text-white border rounded-md pl-10"
              />
            </div>
          </div>
        )}

        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper absolute inset-0 z-10"
          style={{ height: "100vh" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full bg-black flex items-center justify-center">
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-between pt-24">
        <img src={brand2} alt="" />
        <img src={brand1} alt="" />
        <img src={brand3} alt="" />
        <img src={brand4} alt="" />
        <img src={brand5} alt="" />
        <img src={brand6} alt="" />
      </div>
      <div className="product-list flex flex-wrap gap-4">
  {products.map((product) => (
    <div key={product.id} className="flex flex-col items-center">
      <img className="w-56" src={product.bike?.bike1} alt={`Bike 1 - ${product.id}`} />
      <img className="w-56" src={product.bike?.bike2} alt={`Bike 2 - ${product.id}`} />
      {product.bike?.bike3 && (
        <img className="w-56" src={product.bike?.bike3} alt={`Bike 3 - ${product.id}`} />
      )}
      <h1 className="text-xl font-bold mt-2">{product.name?.bike1name}</h1>
    </div>
  ))}
</div>

    </div>
  );
};

export default Main;
