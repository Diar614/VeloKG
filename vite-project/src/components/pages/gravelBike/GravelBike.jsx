import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Slider from "./Slider";
import GravelProductCard from "./GravelProductCard";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import FreerideBikes from "../freerideBikes/FreerideBikes";

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

const GravelBike = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const { ref: sectionRef, inView: sectionInView } = useInView({
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

  const handleAddToCart = (bike) => {
    setCart((prevCart) => {
      const isBikeInCart = prevCart.some((item) => item.id === bike.id);
      if (isBikeInCart) {
        return prevCart;
      } else {
        return [...prevCart, bike];
      }
    });
  };

  return (
    <div>
      <div
        className="w-full h-[1000px] relative bg-cover bg-center"
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
          <h1 className="text-7xl sm:text-6xl md:text-7xl font-bold leading-tight pt-20">
            Гравийный велосипед
          </h1>
        </div>
      </div>

      <motion.div
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl">Что такое катание на горных велосипедах эндуро?</h1>
        <p className="text-lg sm:text-lg md:text-lg leading-relaxed max-w-4xl mx-auto pt-5">
          Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро. В гонках на эндуро гонщики соревнуются на определённых участках (обычно на спусках), но должны перемещаться между участками, на которых ведётся отсчёт времени. Таким образом, эндуро-катание на горных велосипедах в некоторых аспектах похоже на катание на скоростных спусках. Велосипеды сконструированы так, чтобы обеспечить невероятный уровень мастерства при спуске. Однако эндуро-велосипеды отличаются от велосипедов для скоростных спусков или фрирайда тем, что они немного более универсальны. Они очень хорошо взбираются на холмы, несмотря на свою массивность, в то время как велосипед для скоростного спуска практически бесполезен, если только он не едет, ну, вниз по склону.
        </p>
      </motion.div>

      <div className="w-full h-full relative pt-10 pb-32">
        <div className="product-list px-[15%]">
          {products.map((product, index) => (
            <GravelProductCard
              key={index}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-[15%]"
      >
        <h1 className="text-6xl">
          Велосипед для езды по гравийным дорогам против шоссейного велосипеда.
          В чём разница?
        </h1>
        <p className="text-lg sm:text-lg md:text-lg leading-relaxed max-w-4xl mx-auto pt-5">
          Самое большое различие между гравийным и шоссейным велосипедом
          заключается в клиренсе — у гравийных велосипедов большой клиренс для
          широких, цепких шин. Гравийные велосипеды также имеют несколько точек
          крепления для велосипедных сумок, багажников или крыльев. Вы получите
          множество преимуществ шоссейного велосипеда — эффективность на
          подъёмах и на ровной дороге, отличную устойчивость на скорости и
          хорошую управляемость. Но вы также получаете более прочную
          конструкцию, способную преодолевать самые разные препятствия. Многие
          гравийные велосипеды также совместимы с колёсами 650b — это хорошее
          обновление для тех, кто хочет преодолевать особенно неровные или
          сложные гравийные дороги или местность.
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

export default GravelBike;
