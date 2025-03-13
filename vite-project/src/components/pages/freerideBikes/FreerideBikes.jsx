import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../gravelBike/Slider";
import SearchSidebar from "../SearchSidebar";
import Header from "../Header";

const faqData = [
  {
    question:
      "Является ли велосипед для фрирайда лучшим велосипедом для катания в парках?",
    answer:
      "В зависимости от того, кого вы спросите, может быть! Если вы на 100% уверены, что будете кататься только в парке и никогда не будете подниматься в гору, купите горный велосипед для скоростного спуска. Но если вы хотите покорять сложные трассы в парке и за его пределами, велосипед для фрирайда может вам подойти.",
  },
  {
    question: "Могу ли я крутить педали велосипеда в начале тропы?",
    answer:
      "Да! Но медленно. Если зарядка до тропы и поднимается - это ваша игра, а фрирайд-велосипед не будет для вас. Но если вы с удовольствием выполняете упражнение “устойчиво на ходу” в гору, а затем хотите свести к нулю скоростной спуск, фрирайд-байк - хороший выбор.",
  },
];

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
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3_c76b4a8a-80de-423c-9523-2f82ac032889.jpg?v=1649135431&width=832",
    },
    {
      title: "Велосипеды для трейла",
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
        className="w-full h-[1200px] relative bg-cover bg-center"
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
          <h1 className="text-7xl sm:text-6xl md:text-7xl font-bold text-white text-center pt-20 sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16">
            Велосипеды для фрирайда
          </h1>
        </div>
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20 px-[20%]"
      >
        <h1 className="text-6xl mb-6">Что такое фрирайд-байк?</h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5 pr-24">
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
        ref={faqRef}
        className={`w-full h-full relative pt-10 pb-32 ${faqInView ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 1s" }}
      >
        <div className="p-6 max-w-4xl mx-auto mt-10 text-2xl">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300 mb-5">
              <button
                className={`w-full text-left py-4 px-6 font-bold flex justify-between items-center`}
                onClick={() => {}}
              >
                <span className="text-2xl">{item.question}</span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-6"
              >
                <p className="pb-4 text-xl text-gray-700">{item.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      <Slider
        slides={slides}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        swiperRef={swiperRef}
        handleDotClick={handleDotClick}
      />
    </div>
  );
};

export default FreerideBikes;
