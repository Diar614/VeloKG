import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    src: "https://bikes.com/cdn/shop/files/SBP_7400533_2.jpg?v=1715294042&width=800",
    title: "Электровелосипеды",
    route: "/E_bikes",
  },
  {
    src: "https://bikes.com/cdn/shop/files/Web_Element_MRiga_AHestler_NorthVancouverBC_MRP4009_1.jpg?v=1724443951&width=800",
    title: "Пересеченная местность",
  },
  {
    src: "https://bikes.com/cdn/shop/files/Web_Instinct_MRiga_SSchultz_TobyCreekBC_MRP1419.jpg?v=1724784331&width=800",
    title: "Горные маршруты",
  },
  {
    src: "https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP9972_1.jpg?v=1711491455&width=800",
    title: "Enduro",
    route: "/enduro"
  },
];

const TheMain = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const image = document.querySelector("img.w-full.h-auto");
      if (!image) return;
      const rect = image.getBoundingClientRect();
      setHeaderVisible(rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className="w-full h-[600px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Element_NWallner_CPomerantz_Norway_DSC6004.jpg?v=1738938574&width=2000')",
        }}
      >
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
        </div>
        <div className="text-white text-center pt-60">
          <h1 className="font-black text-xl">Одни из лучших в мире</h1>
          <h1 className="text-5xl font-bold pt-5">Будь в своей стихии</h1>
          <div className="pt-15">
            <Link to="/main">
              <button className="bg-red-700 px-6 py-3 font-black rounded-lg cursor-pointer hover:opacity-70 transition-opacity duration-300">
                Check it out
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[1700px] mx-auto mt-10 pl-12 pb-14 pt-14 cursor-pointer">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2.5}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{ clickable: false }}
          loop={false}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2.5 },
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index} className="relative">
              <Link to={item.route}>
                <div className="relative overflow-hidden group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-[900px] h-[480px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-3xl font-bold">
                    <p className="text-center">{item.title}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default TheMain;
