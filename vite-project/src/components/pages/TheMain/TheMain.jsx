import { useState, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; 

const images = [
  {
    src: "https://bikes.com/cdn/shop/files/SBP_7400533_2.jpg?v=1715294042&width=800",
    title: "Электровелосипеды",
    route: "/E_bikes",
  },
  {
    route: "/crossCountry",
    src: "https://bikes.com/cdn/shop/files/Web_Element_MRiga_AHestler_NorthVancouverBC_MRP4009_1.jpg?v=1724443951&width=800",
    title: "Пересеченная местность",
  },
  {
    route: "/kidsBikes",
    src: "https://bikes.com/cdn/shop/files/JSCHPxRocky_FlowBike_img8230_HR.webp?v=1709062812&width=800",
    title: "Для детей",
  },
  {
    src: "https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP9972_1.jpg?v=1711491455&width=800",
    title: "Enduro",
    route: "/enduro",
  },
  {
    src: "https://bikes.com/cdn/shop/files/SBP_00305.jpg?v=1718750770&width=800",
    title: "Фрирайд",
    route: "/freerideBike",
  },
  {
    src: "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1010.jpg?v=1679679734&width=800",
    title: "Гравийные велосипеды",
    route: "/gravelBike",
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
                Проверьте это
              </button>
            </Link>
          </div>
        </div>
      </div>


      <div className="swiper-container w-[90%] mx-auto mt-10 pl-12 pb-14 pt-14 cursor-pointer">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2.5}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: (index, className) => {
              return `<span class="${className} w-10 h-[2px] bg-white/50 transition-all duration-300"></span>`;
            },
          }}
          loop={false}
          speed={500}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1440: { slidesPerView: 3 },
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index} className="relative h-[480px]">
              <Link to={item.route}>
                <div className="relative overflow-hidden group h-full">
                  <img
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-black/30 transition-opacity duration-500 group-hover:bg-black/50">
                    <p className="text-white text-3xl font-bold whitespace-nowrap overflow-hidden text-overflow-ellipsis px-4">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev !text-white !bg-black/50 !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!bg-black/80 transition-all duration-300"></div>
          <div className="swiper-button-next !text-white !bg-black/50 !w-12 !h-12 !rounded-full !flex !items-center !justify-center hover:!bg-black/80 transition-all duration-300"></div>
  
          <div className="swiper-pagination !relative !mt-6 !flex !justify-center !gap-2"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default TheMain;