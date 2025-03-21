import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({
  slides,
  activeIndex,
  setActiveIndex,
  swiperRef,
  handleDotClick,
}) => (
  <div className="bg-[#181314] text-white py-10 px-4 relative">
    <h1 className="text-5xl pb-10 text-center font-bold">
      Ищете что-то другое?
    </h1>
    <div className="prev-button absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-black/30 hover:bg-black/50 transition">
      <ChevronLeftIcon className="w-8 h-8" />
    </div>
    <div className="next-button absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-black/30 hover:bg-black/50 transition">
      <ChevronRightIcon className="w-8 h-8" />
    </div>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides
      loop
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
      ref={swiperRef}
      className="!w-[55%] mx-auto !overflow-visible"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="!w-[80%] mx-auto">
          <div className="relative group">
            <img
              src={slide.image}
              className="rounded-xl w-full h-[500px] object-cover transform transition duration-500 group-hover:scale-105"
              alt={slide.title}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              {slide.text && <p className="text-lg">{slide.text}</p>}
              <Link
                to={slide.link || "#"}
                className="mt-6 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition uderline-animation"
              >
                Узнать больше <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Slider;
