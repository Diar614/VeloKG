import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Slider from "./Slider";

const faqData = [
  {
    question:
      "Велосипед для езды по гравийным дорогам против шоссейного велосипеда. В чём разница?",
    answer:
      "Самое большое различие между гравийным и шоссейным велосипедом заключается в клиренсе — у гравийных велосипедов большой клиренс для широких, цепких шин. Гравийные велосипеды также имеют несколько точек крепления для велосипедных сумок, багажников или крыльев. Вы получите множество преимуществ шоссейного велосипеда — эффективность на подъёмах и на ровной дороге, отличную устойчивость на скорости и хорошую управляемость. Но вы также получаете более прочную конструкцию, способную преодолевать самые разные препятствия. Многие гравийные велосипеды также совместимы с колёсами 650b — это хорошее обновление для тех, кто хочет преодолевать особенно неровные или сложные гравийные дороги или местность.",
  },
  {
    question: "Могу ли я кататься на гравийнем велосипеде по трассам?",
    answer:
      "Определённо! Ну, в пределах разумного. Гравийные велосипеды — это увлекательное испытание на извилистых однопутных трассах с ухабистыми участками, особенно если вы используете бескамерные шины (меньше вероятность проколов). Однако преодолевать сложные гравийные трассы или очень пересечённую местность — не лучшая идея. Гравийный велосипед определённо не выдержит езды по велопарку или участкам для эндуро, но он может выдержать и доставить массу удовольствия на более спокойных трассах для кросс-кантри. Поэтому при взвешивании гравий горный велосипед подумайте о том, что вам следует делать. Горный велосипед всегда позволит кататься по большему количеству маршрутов, чем гравийный. Так что если тропы вам дороги, выбирайте кросс-кантри, трейл или горный велосипед эндуро. Но если вам нравится идея эффективной езды по бездорожью, гравийным дорожкам, проселочным дорогам и необычным мягким трассам для горных велосипедов — выбирайте гравий.",
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

const GravelBike = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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
            "url('https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153_e203e171-0fde-4271-9543-6654d172c44f.jpg?v=1679692674&width=2000')",
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
            Гравийный велосипед
          </h1>
        </div>
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl">Что такое гравийный велосипед?</h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5">
          Так много всего. Гравийный велосипед — это красивый и необычный гибрид
          шоссейного велосипеда, велосипеда для приключений и велосипеда для
          циклокросса с лёгким намёком на горный велосипед. В то время как у
          велосипеда для циклокросса колёсная база короче для маневренности на
          медленных, технически сложных трассах, у гравийных велосипедов
          колёсная база немного длиннее для отличной устойчивости на скорости на
          дороге или на гравии. В результате получается очень выносливый
          велосипед для гонок по гравию, перевозки велосипедов, приключений или
          долгих дней в седле.
        </p>
      </motion.div>

      <motion.div
        ref={faqRef}
        className={`w-full h-full relative pt-10 pb-32 ${
          faqInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "opacity 1s" }}
      >
        <div className="p-6 max-w-4xl mx-auto mt-10 text-2xl">
          {faqData.map((item, index) => (
            <FAQItem key={index} {...item} />
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

export default GravelBike;
