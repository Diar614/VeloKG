import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { useCart } from "../CartContext/CartContext";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { db, collection, getDocs } from "../../firebaseConfig";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FreerideBikes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toggleFavorite, isFavorite, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const slides = [
    {
      title: "Гравийные велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153.jpg",
      link: "/gravelBike",
    },
 
    {
      title: "Кросс-кантри",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/crossCountry",
    },
    {
      title: "Детские велосипеды",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/kidsBikes",
    },
    {
      title: "Ендуро",
      image:
        "https://bikes.com/cdn/shop/files/Web_Element_MRiga_ALN_RGauvin_BritishColumbia-3.jpg",
      link: "/enduro",
    },
  ];

  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  const FreerideProductBike = ({ product }) => {
    const bikes = [
      product.friradeBike,
      product.friradeBike1,
      product.friradeBike3,
      product.friradeBike4,
    ]
      .filter(Boolean)
      .map((bike, index) => ({
        ...bike,
        uniqueId: `${product.id}-freeride-${index}`,
        productId: product.id,
        bikeIndex: index,
        bikeType: 'freeride'
      }));

    if (bikes.length === 0) return null;

    return (
      <div className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {bikes.map((bike, i) => (
            <motion.div
              key={bike.uniqueId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="group relative bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
              style={{ minHeight: '400px' }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(bike);
                }}
                className={`absolute top-4 right-4 z-20 p-2 md:p-3 rounded-full shadow-md transition-all duration-300 ${
                  isFavorite(bike.uniqueId) 
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/90 text-gray-400 hover:text-red-500'
                }`}
                aria-label={isFavorite(bike.uniqueId) ? "Удалить из избранного" : "Добавить в избранное"}
              >
                {isFavorite(bike.uniqueId) ? (
                  <HeartSolid className="h-6 w-6 md:h-8 md:w-8" />
                ) : (
                  <HeartOutline className="h-6 w-6 md:h-8 md:w-8" />
                )}
              </button>
        
              <Link 
                to={`/product/${product.id}?bikeIndex=${i}&bikeType=freeride`}
                className="block relative pt-[70%] bg-gray-100 overflow-hidden"
              >
                <img
                  className="absolute top-0 left-0 w-full h-full object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-500"
                  src={bike.image || "/placeholder-bike.jpg"}
                  alt={bike.name}
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              </Link>

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">{bike.name}</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 min-h-[3em]">{bike.description}</p>
                
                <div className="flex items-center justify-between mt-4 md:mt-6">
                  {bike.price && (
                    <span className="text-lg md:text-xl font-bold text-blue-600">
                      {bike.price} сом
                    </span>
                  )}
                  <Link 
                    to={`/product/${product.id}?bikeIndex=${i}&bikeType=freeride`}
                    className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    Подробнее
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(bike);
                  }}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-base"
                >
                  Добавить в корзину
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          isSearchVisible={isSearchVisible} 
          setSearchVisible={setSearchVisible}
        />
      </div>
      <div>
        <SearchSidebar 
          isSearchVisible={isSearchVisible} 
          setSearchVisible={setSearchVisible} 
        />

        <div className="relative h-[70vh] md:h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://bikes.com/cdn/shop/files/Web_Slayer_MRiga_HZablotny_Utah_MRP2902.jpg"
              alt="Freeride bike hero"
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
              Фрирайд велосипеды
              </h1>
          
              <motion.button
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 md:py-4 md:px-10 rounded-lg transition-colors duration-300 text-base md:text-lg"
              >
                Смотреть модели
              </motion.button>
            </motion.div>
          </div>
        </div>

        <section id="products" className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Модели</h2>
              <div className="w-16 md:w-20 h-1 md:h-2 bg-blue-600 mx-auto"></div>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center py-16 md:py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-12 md:space-y-16">
                {products.map((product) => (
                  <FreerideProductBike key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-100 w-full">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 px-4"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Другие категории</h2>
              <div className="w-16 md:w-20 h-1 md:h-2 bg-blue-600 mx-auto"></div>
            </motion.div>

            <div className="w-full relative px-4">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ 
                  clickable: true,
                  el: '.swiper-pagination',
                }}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 16
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 32
                  }
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="!overflow-visible"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index} className="!h-auto pb-8 md:pb-12">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <div className="relative group h-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] rounded-xl overflow-hidden shadow-md mx-auto max-w-md md:max-w-none">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6 md:p-8">
                          <div className="text-center w-full">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{slide.title}</h3>
                            <Link
                              to={slide.link}
                              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-medium py-2 px-6 md:py-3 md:px-8 rounded-lg transition-colors duration-300 text-sm md:text-base"
                            >
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-pagination !relative !mt-6 md:!mt-8"></div>
              
              <div className="hidden md:flex justify-between items-center mt-6 md:mt-8 px-4">
                <button className="swiper-button-prev bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button className="swiper-button-next bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default FreerideBikes;