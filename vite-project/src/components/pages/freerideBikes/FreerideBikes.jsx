import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../gravelBike/Slider";
import SearchSidebar from "../SearchSidebar";
import Header from "../Header";

const FreerideBikes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "Гравийные велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153.jpg?v=1679692674&width=832",
      link: "/gravelBike",
    },
    {
      title: "Толстокожие велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_BlizzardC90_MRiga_WSimmons_BritishColumbia-16_1.jpg?v=1698359080&width=832",
    },
    {
      title: "Велосипеды для кросс-кантри",
      link: "/crossCountry",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3_c76b4a8a-80de-423c-9523-2f82ac032889.jpg?v=1649135431&width=832",
    },
    {
      title: "Велосипеды для трейла",
      link: "/trailBikes",
      image:
        "https://bikes.com/cdn/shop/files/Print_Instinct_MRiga_FBurke_MontTremblantQC-10_49cd488e-a314-4501-b4d6-4bff57977012.jpg?v=1673485036&width=832",
    },
    {
      title: "Велосипеды для эндуро",
      image:
        "https://bikes.com/cdn/shop/files/DTP_9833.jpg?v=1663868402&width=832",
      link: "/enduro",
    },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
  });
  const { ref: faqRef, inView: faqInView } = useInView({ threshold: 0.2 });

  const handleDotClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <div>
      <div
        className="w-full h-[1000px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Slayer_MRiga_HZablotny_Utah_MRP2902_84edef5d-8a26-4b63-990d-f590ff762807.jpg?v=1686721464&width=2000')",
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
          />

          <div className="text-white text-center pt-20 sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16">
            <h1 className="text-7xl sm:text-6xl md:text-7xl font-bold leading-tight pt-30">
              Эндуро велосипед
            </h1>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl mb-3">Что такое фрирайд-байк?</h1>
        <p className="text-xl sm:text-lg md:text-lg leading-relaxed max-w-4xl mx-auto">
          Велосипед для фрирайда — это велосипед, сочетающий в себе элементы
          горных, трековых и эндуро-велосипедов. Для фрирайда обычно выбирают
          велосипед с ходом 170 мм. Он больше и мощнее, чем эндуро-велосипед, но
          немного меньше и легче, чем специализированный горный велосипед. Дело
          в том, что велосипеды для фрирайда сконструированы так, чтобы быть
          надёжными велосипедами для велопарков, но при этом быть более удобными
          для езды, чем горные велосипеды. Возможно, вы не поставите рекорд по
          подъёму на велосипеде для фрирайда, но вы сможете карабкаться вверх и
          спускаться вниз.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl mb-3">
          Является ли велосипед для фрирайда лучшим велосипедом для катания в
          парках?
        </h1>
        <p className="text-xl sm:text-lg md:text-lg leading-relaxed max-w-4xl mx-auto">
          В зависимости от того, кого вы спросите, может быть! Если вы на 100%
          уверены, что будете кататься только в парке и никогда не будете
          подниматься в гору, купите горный велосипед для скоростного спуска. Но
          если вы хотите покорять сложные трассы в парке и за его пределами,
          велосипед для фрирайда может вам подойти.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl">
          Могу ли я крутить педали велосипеда в начале тропы?
        </h1>
        <p className="text-lg sm:text-lg md:text-lg leading-relaxed max-w-4xl mx-auto pt-3">
          Да, вы можете крутить педали, но не слишком быстро. Если вам нужно
          долго подниматься в гору или заряжать велосипед по сложным участкам,
          то для таких целей фрирайд-байк может не подойти. Однако если вам
          нравится кататься по разнообразным маршрутам, включая подъемы, а затем
          резко спускаться с горы, фрирайд-велосипед будет отличным выбором.
        </p>
      </motion.div>
      <div className="swiper-container overflow-x-hidden">
      <Slider
        slides={slides}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        swiperRef={swiperRef}
        handleDotClick={handleDotClick}
      />
          </div>
    </div>
  );
};

export default FreerideBikes;
