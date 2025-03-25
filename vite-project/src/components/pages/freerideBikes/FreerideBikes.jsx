import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../gravelBike/Slider";
import SearchSidebar from "../SearchSidebar";
import Header from "../Header";
import { db, collection, getDocs } from "../../firebaseConfig";
import FreerideProductBike from "./FreerideProductBike";
import "../gravelBike/GravelProductBike.css"

const FreerideBikes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);
  const [cart, setCart] = useState([]);

  // Единственный useEffect для загрузки продуктов
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

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.some((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

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
              Фрирайд велосипед
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

      <div className="w-full h-full relative pt-10 pb-32">
        <div className="product-list">
          {products.map((product) => (
            <FreerideProductBike
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

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
          подниматься в гору, то вам нужен горный велосипед для скоростного
          спуска. Но если вы хотите покорять парк и ездить по трассам за
          пределами парка, то вам может подойти велосипед для фрирайда.
          Преимущество велосипедов для фрирайда в том, что некоторые из них (но
          не все) совместимы с двойной вилкой. Это означает, что вы можете
          оснастить его массивной вилкой, чтобы преодолевать сложные участки в
          парке, и в значительной степени приблизиться к статусу даунхилл-байка.
          Кроме того, в последние годы велосипеды для фрирайда стали настолько
          хороши, что многие райдеры скажут вам, что специализированный
          даунхилл-байк больше не нужен.
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
          Да! Но медленно. Если вам нравится преодолевать подъёмы и спуски, то
          велосипед для фрирайда вам не подойдёт (вместо него выберите велосипед
          для трейла или велосипед для кросс-кантри). Но если вы готовы ехать
          «как получится» в гору, а потом хотите разогнаться на спуске, то
          велосипед для фрирайда — хороший выбор.
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