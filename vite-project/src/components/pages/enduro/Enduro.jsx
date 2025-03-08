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
import "../main/styles.css"

const slides = [
  {
    title: "Гравийные велосипеды",
    text: " Гравийный велосипед — это красивый и необычный гибрид шоссейного велосипеда, велосипеда для приключений и велосипеда для циклокросса с лёгким намёком на горный велосипед. С точки зрения геометрии и ощущений от езды гравийный велосипед очень похож на шоссейный.",
    image:
      "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153_e203e171-0fde-4271-9543-6654d172c44f.jpg?v=1679692674&width=832",
  },
  {
    title: "Толстокожие велосипеды",
    text: "Лучшие велосипеды с толстыми шинами прочные, долговечные и имеют огромный дорожный просвет. Если вы посмотрите на велосипед с толстыми шинами, то увидите, что он довольно простой. Обычно он жёсткий (то есть у него нет подвески), у него дисковые тормоза и толстые шины. Эти толстые шины играют ключевую роль (подробнее об этом ниже).",
    image:
      "https://bikes.com/cdn/shop/files/Web_BlizzardC90_MRiga_WSimmons_BritishColumbia-16_1.jpg?v=1698359080&width=832",
  },
  {
    title: "Велосипеды для кросс-кантри",
    text: "Езда по пересечённой местности (также часто называемая кросс-кантри и велосипедами для кросс-кантри) предполагает быструю езду везде, а не только вниз по склону. В отличие от эндуро или скоростного спуска, езда по пересечённой местности предполагает быструю езду на подъёмах, по равнине и вниз по склону. Горный велосипед уходит корнями в езду по пересечённой местности и гонки, и эта сфера по-прежнему очень популярна.",
    image:
      "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3_c76b4a8a-80de-423c-9523-2f82ac032889.jpg?v=1649135431&width=832",
  },
  {
    title: "Велосипеды для трейла",
    text: "Считайте, что горный велосипед для трейла — это универсал. Потому что хороший горный велосипед с полной подвеской может делать всё понемногу. Он может подниматься, спускаться, ехать по узким извилистым однопутным дорогам. Горные велосипеды для трейла популярны, потому что они действительно универсальны.",
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

const Enduro = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

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

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div>
      <div
        className="w-full h-[1100px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP1186_2.jpg?v=1711491319&width=2000')",
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex justify-center text-white sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16"
        >
          <h1 className="text-7xl sm:text-6xl md:text-7xl leading-tight">
            Велосипеды для эндуро
          </h1>
        </motion.div>
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20"
      >
        <h1 className="text-6xl  mb-6">
          Что такое катание на горных велосипедах эндуро?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5 pr-24">
          Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро.
          В гонках на эндуро гонщики соревнуются на определённых участках
          (обычно на спусках), но должны перемещаться между ними. Таким образом,
          эндуро-катание на горных велосипедах в некоторых аспектахпохоже на
          катание на горных велосипедах. Велосипеды сконструированы так, чтобы
          обеспечить безумную скорость при спуске. Однако, эндуро-велосипеды
          отличаются от велосипедов для катания на горных велосипедах или
           тем, что они немного более универсальны. Они очень хорошо
          взбираются на холмы, несмотря на свою массивность, в то время как
          велосипед для скоростного спуска практически бесполезен, если только
          он не едет, ну, вниз по склону.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pt-20"
      >
        <h1 className="pl-40 text-5xl max-w-2xl">
          Исследуйте наши эндуро-велосипеды
        </h1>
        <div className="pt-10 flex justify-center ">
          <div className="relative mx-4 group">
            <img
              src="https://bikes.com/cdn/shop/collections/ALN-rocky-mountain-altitude.jpg?v=1712755495&width=800"
              alt=""
              className="w-[800px] h-[480px] transition-transform duration-500 ease-out transform group-hover:scale-105 cursor-pointer"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
              Высота над уровнем моря
            </div>
          </div>
          <div className="relative mx-4 group">
            <img
              src="https://bikes.com/cdn/shop/collections/rocky-mountain-altitude-powerplay-models.jpg?v=1682367308&width=800"
              alt=""
              className="w-[800px] h-[480px] transition-transform duration-500 ease-out transform group-hover:scale-105 cursor-pointer"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold">
              Мощная игра на высоте
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20"
      >
        <h1 className="text-6xl mb-6">
          Почему я должен выбрать горный велосипед enduro, а не трейловый?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5">
          Если вам действительно не терпится как можно быстрее промчаться по
          крутым, труднопроходимым тропам, купите велосипед для эндуро. Вы
          по-прежнему сможете погонять с друзьями на
          <Link
            to="/freerideBike"
            className="underline pl-2 cursor-pointer hover:text-blue-700"
          >
            фрирайд-велосипедов
          </Link>
          в течение дня, но вы будете в восторге от спусков и труднопроходимых
          участков тропы. Конечно, на подъёмах вам придётся немного тяжелее, так
          что если для вас важны мастерство в подъёмах и сохранение темпа на
          равнинных участках, то выбирайте трейл-байк. Но если вам нравится
          спускаться с горы как можно быстрее (и иногда кататься в парке),
          выбирайте эндуро.
        </p>
      </motion.div>

      <div className="bg-[#181314] text-white py-10 px-4">
      <h1 className="text-5xl pt-15 pb-13">Ищете что-то другое?</h1>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={{
            prevEl: ".prev-button",
            nextEl: ".next-button",
          }}
          ref={swiperRef}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center gap-10 bg-[#181314]">
                <img
                  src={slide.image}
                  className="rounded-xl w-[200px] h-[350px] object-cover"
                />
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

        <div className="flex items-center justify-center gap-5 mt-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                activeIndex === index ? "text-white" : "text-gray-500"
              }`}
              onClick={() => handleDotClick(index)}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  activeIndex === index
                    ? "bg-white border-white"
                    : "border-gray-500"
                }`}
              />
              <span className="text-xs mt-2">{slide.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Enduro;
