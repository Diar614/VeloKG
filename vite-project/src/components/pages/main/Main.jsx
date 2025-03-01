import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { useProduct } from "../product-slice.js/productd-slice"; 
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";


const faqData = [
  {
    question: "Каков максимальный клиренс шин?",
    answer: "29 x 2,6",
  },
  {
    question: "Какой рекомендуемый прогиб?",
    answer:
      "Шок: мы рекомендуем примерно 20–35% провисания для этой платформы. Форк: мы рекомендуем примерно 15–20% провисания для этой платформы.",
  },
  {
    question: "Каков максимальный размер кольца цепи?",
    answer: "Элемент совместим с кольцами-цепочками весом до 36 тонн.",
  },
  {
    question: "Совместим ли елемент UDH?",
    answer: "Да, этот элемент совместим с UDH.",
  },
  {
    question: "Почему нет хранилища downtuwn?",
    answer:
      "Снижение веса рамы было более важным приоритетом. У нас по-прежнему есть крепления для двух бутылок с водой и дополнительные крепления для аксессуаров на раме для всех возможных внешних хранилищ.",
  },
  {
    question: "Каковы размеры удара?",
    answer: "Элемент совместим только с амортизаторами 190x45 мм.",
  },
  {
    question: "Какой рекомендуемый ход вилки?",
    answer: "Элемент предназначен для хода вилки от 120 до 140 мм",
  },
  {
    question: "Какой рекомендуемый ход вилки?",
    answer: "Элемент предназначен для хода вилки от 120 до 140 мм",
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
        {question}
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
        <p className="pb-4 text-gray-700">{answer}</p>
      </motion.div>
    </div>
  );
};

const Main = () => {
  const { products, isFetch, getAllProduct } = useProduct();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://bikes.com/cdn/shop/files/RM_2025_Website_CollectionHero_Element_Action_v2_1.jpg?v=1726247080&width=2000",
    "https://bikes.com/cdn/shop/collections/Web_Element1_MRiga_BritishColumbia-06.jpg?v=1717782648&width=2000",
  ];

  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: productRef, inView: productInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    getAllProduct(); 

    const handleScroll = () => {
      const image = document.querySelector("img.w-full.h-auto");
      if (!image) return;
      const rect = image.getBoundingClientRect();
      setHeaderVisible(rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isFetch) {
    return <h1 className="text-center text-2xl font-bold mt-10">Loading...</h1>;
  }

  return (
    <div className="w-full h-full relative">
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
        <img className="w-full h-auto" src={slides[currentSlide]} alt="" />
      </div>
      <div
        style={{ "--background": "38 32 32", "--text-color": "229 229 229" }}
        className="bg-[rgb(var(--background))] text-[rgb(var(--text-color))] p-8 text-center"
      >
        <h1 className="text-7xl pt-32 font-bold">Будь в своей Стихии.</h1>
        <h1 className="max-w-3xl mx-auto mt-6 text-xl">
          Модель Element, разработанная для достижения идеального баланса между
          лёгкостью, эффективностью при беге по пересечённой местности и
          технической точностью, — это лучшее из возможного.
        </h1>
        <div className="flex justify-center items-center space-x-40 text-4xl mt-10 pb-30 pt-10">
          <div className="flex flex-col items-center">
            <h1>Пересеченная местность</h1>
            <p className="text-3xl text-gray-400 mt-2">Предназначен для</p>
          </div>

          <h1 className="text-5xl text-gray-500"></h1>

          <div className="flex flex-col items-center">
            <h1>130/120</h1>
            <p className="text-4xl text-gray-400 mt-2">Ход (мм)</p>
          </div>

          <h1 className="text-5xl text-gray-500"></h1>

          <div className="flex flex-col items-center">
            <h1>29, 27.5</h1>
            <p className="text-3xl text-gray-400 mt-2">Размер колеса</p>
          </div>
        </div>
      </div>
      <div className="bg-stone-50 min-h-screen p-6">
   
        <div
          ref={productRef}
          className={`product-list grid grid-cols-2 gap-6 px-64 pt-52 ${productInView ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 1s" }}
        >
{products.map((product) => {
  const { bike, name, description } = product;
  if (!bike) return null;
  return Object.keys(bike).map((key, index) => (
    <Link
      to={`/product/${product.id}`}  
      key={`${product.id}-${key}`}
      className="bg-white shadow-md rounded-md overflow-hidden mx-2"
    >
      <div className="relative">
        <span className="absolute top-1 left-1 bg-black text-white text-xs font-bold px-1 py-0.5 rounded">
          Новое
        </span>
        <img
          className="w-140 h-85 object-cover"
          src={bike[key]}
          alt={name?.[`${key}name`] || `Bike ${index + 1}`}
        />
      </div>
      <div className="p-4 bg-stone-200">
        <h1 className="text-sm font-bold">
          {name?.[`${key}name`] || `Bike ${index + 1}`}
        </h1>
        <p className="text-gray-600 text-2xs mx-auto">
          {description ||
            "Fox 34 Float Performance Elite, Fox Float Performance Elite, Sram Level Bronze Stealth 4 Piston, Sram GX Eagle Transmission Wireless"}
        </p>
        <div className="mt-2">
          <input
            type="checkbox"
            id={`compare-${product.id}-${key}`}
          />
          <label
            htmlFor={`compare-${product.id}-${key}`}
            className="ml-1 text-2xs"
          >
            + ДОБАВИТЬ ДЛЯ СРАВНЕНИЯ
          </label>
        </div>
      </div>
    </Link>
  ));
})}

        </div>

        <h2 className="text-3xl font-bold text-center mb-4 pt-20">Часто задаваемые вопросы</h2>
        <div
          ref={faqRef}
          className={`w-full h-full relative pt-10 pb-32 ${faqInView ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "opacity 1s" }}
        >
          <div className="p-6 max-w-4xl mx-auto mt-10 bg-stone-100">
            <h1 className="text-xl">
              {faqData.map((item, index) => (
                <FAQItem key={index} {...item} />
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
