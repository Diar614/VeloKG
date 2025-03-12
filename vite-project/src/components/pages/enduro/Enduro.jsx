import React from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { motion } from "framer-motion";
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
import { Link } from "react-router-dom";

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

const Enduro = () => {
  return (
    <div>
      <div
        className="w-full h-[1100px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP1186.jpg?v=1711491319&width=2000')",
        }}
      >
        <SearchSidebar />
        <div className="relative z-10">
          <Header />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex justify-center items-center text-white sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16"
        >
          <h1 className="text-7xl sm:text-6xl md:text-7xl leading-tight text-center">
            Велосипеды для эндуро
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl mb-3">
          Что такое катание на горных велосипедах эндуро?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро.
          В гонках на эндуро гонщики соревнуются на определённых участках
          (обычно на спусках), но должны перемещаться между ними. Таким образом,
          эндуро-катание на горных велосипедах в некоторых аспектах похоже на
          катание на горных велосипедах. Велосипеды сконструированы так, чтобы
          обеспечить безумную скорость при спуске. Однако, эндуро-велосипеды
          отличаются от велосипедов для катания на горных велосипедах или тем,
          что они немного более универсальны. Они очень хорошо взбираются на
          холмы, несмотря на свою массивность.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pt-20 px-[15%]"
      >
        <h1 className="pl-40 text-5xl max-w-2xl">
          Исследуйте наши эндуро-велосипеды
        </h1>
        <div className="pt-10 flex justify-center">
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
        className="flex flex-col items-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl">
          Почему я должен выбрать горный велосипед enduro, а не трейловый?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-3">
          Если вам действительно не терпится как можно быстрее промчаться по
          крутым, труднопроходимым тропам, купите велосипед для эндуро. Вы
          по-прежнему сможете погонять с друзьями на
          <Link
            to="/freerideBike"
            className="transition underline-animation pl-2"
          >
            фрирайд-велосипедах
          </Link>
          , но вы будете в восторге от спусков и труднопроходимых участков
          тропы. Конечно, на подъёмах вам придётся немного тяжелее, так что если
          для вас важны мастерство в подъёмах и сохранение темпа на равнинных
          участках, то выбирайте трейл-байк. Но если вам нравится спускаться с
          горы как можно быстрее, выбирайте эндуро.
        </p>
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
          navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
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
                  <p className="text-lg">{slide.text}</p>
                  <Link
                    to={slide.link}
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
    </div>
  );
};

export default Enduro;
