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


const CrossCountry = () => {
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
            "url('https://bikes.com/cdn/shop/files/Web_Element_MRiga_Product_SouthChilcotinsBC_MRP6044_1.jpg?v=1706125255&width=2000')",
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
          <h1 className="text-9xlxl sm:text-6xl md:text-7xl font-light text-white text-center pt-20 sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16 ">
            Велосипеды для эзды по пересеченной местности| XC
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl mb-3">
          Что такое езда по пересеченной местности?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          Езда по пересеченной местности (также часто называемая XC riding и XC
          bikes) фокусируется на быстрой езде повсюду, а не только под гору. В
          отличие от эндуро или скоростного спуска, езда по пересеченной
          местности - это быстрая езда на подъемах, по равнинам и под гору.
          Катание на горных велосипедах уходит своими корнями в езду по
          пересеченной местности и гонки, и сегодня это направление по-прежнему
          очень популярно.
        </p>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5">
          Подходящий велосипед для езды по пересечённой местности — это лёгкий
          горный велосипед. Но поскольку даже велосипеды для езды по
          пересечённой местности с полной подвеской оптимизированы по весу и
          эффективности, это также означает, что они хуже справляются с очень
          крутыми спусками и особенностями, такими как
          <Link
            to="/enduro"
            className="transition underline-animation pl-2 pr-2"
          >
            эндуро
          </Link>
          или
          <Link to="/enduro" className="transition underline-animation pl-2">
            треккинговый велосипед.
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl mb-3">
          Подходят ли велосипеды для бега по пересеченной местности только для
          гонок?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-10">
          Велосипеды для кросс-кантри отлично подходят для гонок и быстрой езды,
          но они также хороши для езды по выходным и ежедневного использования.
          На лёгких велосипедах весело ездить быстро, и это касается как
          гонщиков, так и всех остальных. Они также намного эффективнее, чем
          более крупные велосипеды с полной подвеской на равнинах, холмах или
          асфальтированных/грунтовых дорогах между трассами. Таким образом,
          несмотря на то, что многие велосипеды для кросс-кантри и их
          модификации частично предназначены для гонок, они могут стать
          отличными повседневными велосипедами для гонщиков, которым важна
          эффективность и скорость на постоянно меняющейся местности. Просто не
          пытайтесь сделать их слишком большими. Как правило, велосипеды для
          кросс-кантри имеют более короткую подвеску (100–120 мм вместо 140–160
          мм).
        </p>

        <h1 className="text-6xl mb-3 pt-15">
          Почему я должен предпочесть беговой велосипед трейловому?
        </h1>
        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-10">
          Если вы хотите участвовать в гонках или соревноваться на быстрых,
          извилистых, холмистых трассах — выбирайте велосипед для кросс-кантри.
          Он сможет преодолевать такие же трассы, как и велосипед для трейла, но
          будет подниматься в гору намного быстрее и лучше держать скорость на
          равнине. Велосипед для кросс-кантри также станет отличным вариантом,
          если вы предпочитаете более спокойные, извилистые трассы, а не крутые
          и сложные. У вас по-прежнему будут отличные манеры вождения и
          компетентность, когда трассы станут немного более неровными или
          дикими, и вы будете экономить силы и чувствовать себя бодрее на
          вершине коротких и крутых подъёмов или длинных пологих подъёмов. Но
          если вам нравится быстро и мощно спускаться с горы и крепко держаться
          за руль на поворотах и при прохождении неровностей, подумайте о
          кроссовом или эндуро-байке.
        </p>
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

export default CrossCountry;
