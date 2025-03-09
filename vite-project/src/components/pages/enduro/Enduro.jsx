import React, { useState, useRef, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import "../main/styles.css";

// Если переменная slides нужна в другом месте, можно оставить её в этом файле:
const slides = [
  {
    title: "Гравийные велосипеды",
    text: "Гравийный велосипед — это красивый и необычный гибрид шоссейного велосипеда...",
    image: "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153_e203e171-0fde-4271-9543-6654d172c44f.jpg?v=1679692674&width=832",
  },
  // другие слайды...
];

const Enduro = () => {
  return (
    <div>
      <div
        className="w-full h-[1100px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP1186_2.jpg?v=1711491319&width=2000')",
        }}
      >
        <SearchSidebar />
        <div className="relative z-10">
          <Header />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex justify-center text-white sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16"
        >
          <h1 className="text-7xl sm:text-6xl md:text-7xl leading-tight">Велосипеды для эндуро</h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20"
      >
        <h1 className="text-6xl  mb-6">Что такое катание на горных велосипедах эндуро?</h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5 pr-24">
          Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро...
        </p>
      </motion.div>

      {/* Добавьте остальные компоненты и анимации */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center gap-10 bg-[#181314]">
              <img src={slide.image} className="rounded-xl w-[200px] h-[350px] object-cover" />
              <div>
                <h2 className="text-3xl ">{slide.title}</h2>
                <p className="mt-4 text-white">{slide.text}</p>
                <span href="#" className="underline-animation cursor-pointer">
                  Узнать больше
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Enduro;
