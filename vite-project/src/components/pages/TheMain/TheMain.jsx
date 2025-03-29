import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setHeaderVisible(!isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header
          isSearchVisible={isSearchVisible}
          setSearchVisible={setSearchVisible}
          isHeaderVisible={isHeaderVisible}
        />
      </div>

      <SearchSidebar
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
      />

      <div>
        <div className="relative h-[70vh] md:h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://bikes.com/cdn/shop/files/Web_Element_NWallner_CPomerantz_Norway_DSC6004.jpg?v=1738938574&width=2000"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Будь в своей Стихии
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-3xl mx-auto">
                Одни из лучших велосипедов в мире для настоящих ценителей
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 md:py-4 md:px-10 rounded-lg transition-colors duration-300 text-base md:text-lg"
                onClick={() => navigate('/main')}
              >
                Проверьте это
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="w-[90%] mx-auto mt-10 pl-12 pb-14 pt-14 cursor-pointer">
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
    </div>
  );
};

export default TheMain;