
import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import ProductCard from "./ProductCard";  
import Speedometer from "../Speedometer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



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
  const [products, setProducts] = useState([]);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const slides = [
    {
      title: "Гравийные велосипеды",
      image: "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153.jpg",
      link: "/gravelBike",
    },
    {
      title: "Толстокожие велосипеды",
      image: "https://bikes.com/cdn/shop/files/Web_BlizzardC90_MRiga_WSimmons_BritishColumbia-16_1.jpg",
      link: "/fatbikes",
    },
    {
      title: "Кросс-кантри",
      image: "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/crossCountry",
    },
  ];

  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "products");
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">

      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          isSearchVisible={isSearchVisible} 
          setSearchVisible={setSearchVisible}
        />
      </div>

 
      <SearchSidebar 
        isSearchVisible={isSearchVisible} 
        setSearchVisible={setSearchVisible} 
      />

      
      <div className=""> 
        
      
        <div className="relative h-[70vh] md:h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://bikes.com/cdn/shop/files/RM_2025_Website_CollectionHero_Element_Action_v2_1.jpg?v=1726247080&width=2000"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Будь в своей Стихии
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-3xl mx-auto">
                Модель Element, разработанная для достижения идеального баланса
                между лёгкостью, эффективностью при беге по пересечённой местности и
                технической точностью, — это лучшее из возможного.
              </p>
              <motion.button
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 md:py-4 md:px-10 rounded-lg transition-colors duration-300 text-base md:text-lg"
              >
                Смотреть модели
              </motion.button>
            </motion.div>
          </div>
        </div>

    
        <section className="py-12 md:py-16 bg-[rgb(var(--background))] text-[rgb(var(--text-color))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Пересеченная местность</h3>
                <p className="text-gray-400 text-lg">Предназначен для</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <Speedometer />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2">29, 27.5</h3>
                <p className="text-gray-400 text-lg">Размер колеса</p>
              </motion.div>
            </div>
          </div>
        </section>

   
        <section id="products" className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Модельный ряд</h2>
              <div className="w-16 md:w-20 h-1 md:h-2 bg-blue-600 mx-auto"></div>
            </motion.div>

            <div className="space-y-12 md:space-y-16">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

      
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12"
            >
              Часто задаваемые вопросы
            </motion.h2>
            
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              {faqData.map((item, index) => (
                <FAQItem key={index} {...item} />
              ))}
            </div>
          </div>
        </section>


       


        <section className="py-12 md:py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
            >
              Готовы к приключениям?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto"
            >
              Смотрите все велосипеды в нашем магазине
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/bikes"
                className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 md:py-4 md:px-10 rounded-lg transition-colors duration-300 text-base md:text-lg"
              >
                Перейти в магазин
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;




