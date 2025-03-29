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
    swiperRef.current.swiper.slideTo(index); 
  };

  return (
    <div className="bg-[#181314] text-white py-16 relative w-screen overflow-hidden -mx-[calc((100vw-100%)/2)]">
      <h1 className="text-4xl md:text-5xl pb-12 text-center font-bold">
        Ищете что-то другое?
      </h1>
      
      <div className="relative w-screen">
        {/* Навигационные кнопки */}
        <button className="prev-button absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="next-button absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Слайдер на всю ширину экрана */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides
          loop
          navigation={{ 
            prevEl: ".prev-button", 
            nextEl: ".next-button" 
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          ref={swiperRef}
          className="w-screen"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="w-screen">
              <div className="relative group w-screen h-[60vh] min-h-[500px]">
                <img
                  src={slide.image}
                  className="w-screen h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={slide.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end pb-16 px-8 md:px-16">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-lg md:text-xl opacity-90 mb-6">{slide.text}</p>
                    <Link
                      to={slide.link || "/more-info"}
                      className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Узнать больше
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-pagination !relative !mt-6 flex justify-center gap-2"></div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-red-600 text-white font-medium" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {slide.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnduroSwiper;