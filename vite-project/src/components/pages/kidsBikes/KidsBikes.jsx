import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../gravelBike/Slider";
import SearchSidebar from "../SearchSidebar";
import Header from "../Header";
import KidsProductBike from "./KidsProductBike";

const KidsBikes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

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
            "url('https://bikes.com/cdn/shop/files/MRP0478.jpg?v=1732204250&width=2000')",
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
          <h1 className="text-xl font-light text-white text-center pt-60 sm:pt-60 lg:pt-80 px-4 sm:px-8 lg:px-16 ">
            Предстоящее путешествие начинается здесь
          </h1>
          <h1 className="text-9xlxl sm:text-6xl md:text-7xl font-light text-white text-center px-4 sm:px-8 lg:px-16 pt-10">
            Детские велосипеды
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-20 px-[15%]">

        <p className="text-5xl font-bold mx-auto pt-10">
        Приступим
        </p>
        <h1 className="text-[25px] font-light pt-15">
        Учитесь кататься? Начните здесь. Просто, надежно и с несколькими размерами колес, чтобы подойти для разных возрастных групп детей
        </h1>
      </div>
      <div className="product-list px-[15%]">
        {products.map((product, index) => (
          <KidsProductBike key={index} product={product} />
        ))}
      </div>

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

export default KidsBikes;
