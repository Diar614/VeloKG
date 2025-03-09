import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import "./PaginationStyle.css";

const faqData = [
  {
    question:
      "Является ли велосипед для фрирайда лучшим велосипедом для катания в парках?",
    answer:
      "В зависимости от того, кого вы спросите, может быть! Если вы на 100% уверены, что будете кататься только в парке и никогда не будете подниматься в гору, купите горный велосипед для скоростного спуска. Но если вы хотите покорять сложные трассы в парке и за его пределами, велосипед для фрирайда может вам подойти. Преимущество велосипедов для фрирайда в том, что некоторые из них (но не все) совместимы с двойной короной. Это означает, что вы можете оснастить его массивной вилкой для преодоления сложных участков в парке и в значительной степени добиться статуса байка для скоростного спуска. Кроме того, в последние годы велосипеды для фрирайда стали настолько хороши, что многие райдеры скажут вам, что специализированный байк для скоростного спуска больше не нужен.",
  },
  {
    question: "Могу ли я крутить педали велосипеда в начале тропы?",
    answer:
      "Да! Но медленно. Если зарядка до тропы и поднимается-это ваша игра, а фрирайд-велосипеда не будет для вас (опт для след или велосипед для беговых лыж вместо этого). Но если вы с удовольствием выполняете упражнение “устойчиво на ходу” в гору, а затем хотите свести к нулю скоростной спуск, фрирайд-байк - хороший выбор.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 mb-5">
      <button
        className={`w-full text-left py-4 px-6 font-bold flex justify-between items-center ${
          isOpen ? "text-black" : "text-gray-800"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl">{question}</span>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-6"
      >
        <p className="pb-4 text-xl text-gray-700">{answer}</p>
      </motion.div>
    </div>
  );
};

const FreerideBikes = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Гравийные велосипеды",
      text: "Так много всего. Гравийный велосипед — это красивый и необычный гибрид шоссейного велосипеда, велосипеда для приключений и велосипеда для циклокросса с лёгким намёком на горный велосипед. С точки зрения геометрии и ощущений от езды гравийный велосипед очень похож на шоссейный.",
      image:
        "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153_e203e171-0fde-4271-9543-6654d172c44f.jpg?v=1679692674&width=832",
    },
    {
      title: "Толстокожие велосипеды",
      text: "Лучшие велосипеды с толстыми шинами прочные, долговечные и имеют большой дорожный просвет. Если вы посмотрите на велосипед с толстыми шинами, то увидите, что он довольно простой. Обычно он жёсткий (то есть у него нет подвески), у него дисковые тормоза и толстые шины. Толстые шины играют ключевую роль (подробнее об этом ниже).",
      image:
        "https://bikes.com/cdn/shop/files/Web_BlizzardC90_MRiga_WSimmons_BritishColumbia-16_1.jpg?v=1698359080&width=832",
    },
    {
      title: "Велосипеды для кросс-кантри",
      text: "Езда по пересеченной местности (также часто называемая XC riding и XC bikes) фокусируется на быстрой езде повсюду, а не только под гору. В отличие от эндуро или скоростного спуска, езда по пересеченной местности - это быстрая езда на подъемах, по равнинам и под гору. Катание на горных велосипедах уходит своими корнями в езду по пересеченной местности и гонки, и сегодня это направление по-прежнему очень популярно.",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3_c76b4a8a-80de-423c-9523-2f82ac032889.jpg?v=1649135431&width=832",
    },
    {
      title: "Велосипеды для трейла",
      text: "Представьте, что трейл-байк — это универсал. Потому что хороший трейл-байк с полной подвеской может делать всё понемногу. Он может подниматься в гору, спускаться с неё, ездить по узким извилистым однопутным дорогам. Трейл-байки популярны, потому что они действительно универсальны.",
      image:
        "https://bikes.com/cdn/shop/files/Print_Instinct_MRiga_FBurke_MontTremblantQC-10_49cd488e-a314-4501-b4d6-4bff57977012.jpg?v=1673485036&width=832",
    },
    {
      title: "Велосипеды для эндуро",
      text: "В то время как эндуро-маунтинбайк уходит корнями в гонки, эндуро-велосипеды являются популярным вариантом для гонщиков, которые хотят спускаться по крутым трассам, но при этом хотят иметь возможность эффективно подниматься в гору и преодолевать крутые участки.",
      image:
        "https://bikes.com/cdn/shop/files/DTP_9833.jpg?v=1663868402&width=832",
    },
  ];

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const swiperRef = useRef(null);

  const handleDotClick = (index) => {
    swiperRef.current.swiper.slideTo(index);
    setActiveIndex(index);
  };

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
            isHeaderVisible={isHeaderVisible}
          />
        </div>
        <div className="text-white text-center pt-20 sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16">
          <h1 className="text-7xl sm:text-6xl md:text-7xl font-bold leading-tight pt-5">
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
          горных, трековых и
          <Link
            to="/enduro"
            className="underline pl-2 pr-2 cursor-pointer hover:text-blue-700"
          >
            эндуро велосипедов
          </Link>
          . Для фрирайда обычно выбирают велосипед с ходом 170 мм. Он больше и
          мощнее обычных горных велосипедов, что позволяет ездить по более
          сложным маршрутам.
        </p>
      </motion.div>

      <motion.div
        ref={faqRef}
        className={`w-full h-full relative pt-10 pb-32 ${
          faqInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "opacity 1s" }}
      >
        <div className="p-6 max-w-4xl mx-auto mt-10  text-2xl">
          {faqData.map((item, index) => (
            <FAQItem key={index} {...item} />
          ))}
        </div>
      </motion.div>
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
          navigation={{
            prevEl: ".prev-button",
            nextEl: ".next-button",
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return (
                <div className={`${className} custom-pagination`}>
                  <span className="pagination-title">
                    {slides[index].title}
                  </span>
                </div>
              );
            },
          }}
          ref={swiperRef}
          className="!w-[55%] mx-auto !overflow-visible"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="!w-[80%] mx-auto">
              <div className="relative group">
                <img
                  src={slide.image}
                  className="rounded-xl w-full h-[300px] object-cover transform transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg text-gray-200 max-w-[60%]">
                    {slide.text}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                  >
                    Узнать больше
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FreerideBikes;
