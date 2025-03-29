import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Enduro = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Гравийные велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153.jpg",
      link: "/gravelBike",
    },
 
    {
      title: "Кросс-кантри",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/crossCountry",
    },
    {
      title: "Детские велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/kidsBikes",
    },
    {
      title: "Ендуро",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/enduro",
    },
  ];



  return (
    <div className="bg-white">
     
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          isSearchVisible={isSearchVisible} 
          setSearchVisible={setSearchVisible}
        />
      </div>

  
      <SearchSidebar 
        isSearchVisible={isSearchVisible} 
        setSearchVisible={setSearchVisible} 
      />

 
      <div className="pt-16">
   
        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP1186_2.jpg?v=1711491319&width=2000"
              alt="Enduro Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Эндуро велосипеды
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Максимальная скорость на спусках без компромиссов
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 md:py-4 md:px-10 rounded-lg transition-colors duration-300"
                onClick={() => {
                  const section = document.getElementById("models");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Смотреть модели
              </motion.button>
            </motion.div>
          </div>
        </div>

  
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Что такое катание на горных велосипедах эндуро?
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро.
              В гонках на эндуро гонщики соревнуются на определённых участках
              (обычно на спусках), но должны перемещаться между ними. Таким образом,
              эндуро-катание на горных велосипедах в некоторых аспектах похоже на
              катание на горных велосипедах. Велосипеды сконструированы так, чтобы
              обеспечить безумную скорость при спуске.
            </p>
          </motion.div>
        </section>

       

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-gray-50 rounded-xl my-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Почему выбрать эндуро вместо трейлового?
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Если вам действительно не терпится как можно быстрее промчаться по
              крутым, труднопроходимым тропам, купите велосипед для эндуро. Вы
              по-прежнему сможете погонять с друзьями на{' '}
              <Link
                to="/freerideBike"
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                фрирайд-велосипедах
              </Link>
              , но вы будете в восторге от спусков и труднопроходимых участков
              тропы.
            </p>
          </motion.div>
        </section>


        <section className="py-16 md:py-24 bg-gray-900 text-white w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <div className="w-full px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ищете что-то другое?
              </h2>
              <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            </motion.div>

            <div className="relative w-full">
              
              <button className="enduro-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors">
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              
              <button className="enduro-next absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition-colors">
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>

              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides
                loop
                navigation={{
                  prevEl: ".enduro-prev",
                  nextEl: ".enduro-next"
                }}
                pagination={{
                  clickable: true,
                  el: '.enduro-pagination',
                  type: 'bullets',
                }}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                className="w-full"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative group overflow-hidden w-full h-[60vh] min-h-[500px]"
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <div className="max-w-4xl mx-auto text-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {slide.title}
                          </h3>
                          <p className="text-gray-300 mb-6">{slide.text}</p>
                          <Link
                            to={slide.link}
                            className="inline-flex items-center text-red-400 hover:text-red-300 font-medium transition-colors"
                          >
                            Узнать больше <ArrowRightIcon className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="enduro-pagination !bottom-0 !relative !mt-8 flex justify-center gap-2"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Enduro;