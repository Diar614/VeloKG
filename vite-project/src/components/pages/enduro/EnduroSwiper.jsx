import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EnduroSwiper = ({ slides }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryClick = (index) => {
    swiperRef.current.swiper.slideTo(index); // Переключение слайда по индексу
  };

  return (
    <div className="bg-[#181314] text-white py-10 px-4 relative">
      <h1 className="text-5xl pb-10 text-center font-bold">
        Ищете что-то другое?
      </h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        loop
        navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} 
        ref={swiperRef}
        className="!w-[55%] mx-auto !overflow-visible"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative group rounded-xl overflow-hidden">
              <img
                src={slide.image}
                className="w-full h-[300px] object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
                alt={slide.title}
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="text-lg mt-2 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gray-500 group-hover:text-white">
                  {slide.text}
                </p>

                <Link
                  to="/more-info"
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-blue-700 cursor-pointer"
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-4 w-full flex justify-center space-x-6 text-xl text-gray-500 px-[15%] pt-[5%]">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(index)} 
            className={`transition-colors duration-500 ${
              activeIndex === index ? "text-white font-semibold" : "text-gray-500"
            }`}
          >
            {slide.title} 
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnduroSwiper;
