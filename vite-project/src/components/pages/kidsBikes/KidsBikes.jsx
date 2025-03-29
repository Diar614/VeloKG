import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import { useCart } from "../CartContext/CartContext";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./KidsBikes.css";

const KidsBikes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { toggleFavorite, isFavorite, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
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
      image: "https://bikes.com/cdn/shop/files/Web_Solo_MRiga_RAnderson_Saskatchewan_MRP1153.jpg",
      link: "/gravelBike",
    },

    {
      title: "Детские велосипеды",
      image: "https://bikes.com/cdn/shop/files/JSCHPxRocky_FlowBike_img8230_HR.webp?v=1709062812&width=800",
      link: "/kidsBikes",
    },
    {
      title: "Ендуро",
      image: "https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP9972_1.jpg?v=1711491455&width=800",
      link: "/enduro",
    },


  ];

  const handleDotClick = (index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  const KidsProductCard = ({ product }) => {
    const bikes = [
      product.KidsBike1,
      product.KidsBike2,
      product.KidsBike3,
      product.KidsBike4,
      product.KidsBike5
    ]
      .filter(bike => bike?.name)
      .map((bike, index) => ({
        ...bike,
        uniqueId: `${product.id}-kids-${index}`,
        productId: product.id,
        bikeIndex: index,
        bikeType: "kids",
        ageRange: bike.ageRange || "4-8 лет",
        wheelSize: bike.wheelSize || "20 дюймов"
      }));

    if (!bikes.length) return null;

    const bikeGroups = [
      {
        title: "Первые шаги",
        description: "Идеальные велосипеды для самых маленьких",
        bikes: bikes.slice(0, 1)
      },
      {
        title: "Для уверенных райдеров",
        description: "Модели для детей, освоивших базовые навыки",
        bikes: bikes.slice(1, 3)
      },
      {
        title: "Для опытных гонщиков",
        description: "Профессиональные модели для продвинутых юных спортсменов",
        bikes: bikes.slice(3)
      }
    ].filter(group => group.bikes.length > 0);

    return (
      <div className="product-group-container">
        {bikeGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            <div className="product-group-header">
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </div>
            
            <div className="compact-bike-grid">
              {group.bikes.map((bike, bikeIndex) => (
                <motion.div
                  key={bike.uniqueId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: bikeIndex * 0.1 }}
                  className="compact-bike-card"
                  whileHover={{ y: -3 }}
                >
                  <div className="card-badge">NEW</div>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(bike);
                    }}
                    className={`favorite-btn ${isFavorite(bike.uniqueId) ? 'active' : ''}`}
                  >
                    {isFavorite(bike.uniqueId) ? (
                      <HeartSolid className="icon" />
                    ) : (
                      <HeartOutline className="icon" />
                    )}
                  </button>

                  <Link 
                    to={`/product/${product.id}?bikeIndex=${bike.bikeIndex}&bikeType=kids`}
                    className="compact-bike-image-link"
                  >
                    <img
                      src={bike.image || "/placeholder-bike.jpg"}
                      alt={bike.name}
                      loading="lazy"
                      className="compact-bike-image"
                    />
                  </Link>

                  <div className="compact-bike-details">
                    <h3 className="compact-bike-title">{bike.name}</h3>
                    <div className="compact-bike-specs">
                      <span className="age-range">{bike.ageRange}</span>
                      <span className="wheel-size">{bike.wheelSize}</span>
                    </div>
                    <p className="compact-bike-price">{bike.price} сом</p>
                    
                    <div className="compact-bike-actions">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(bike);
                        }}
                        className="compact-add-to-cart"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="kids-page">
      <Header 
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
      />
      
      <SearchSidebar
        isSearchVisible={isSearchVisible}
        setSearchVisible={setSearchVisible}
      />

      <section className="hero-section">
        <div className="hero-image">
          <img
            src="https://bikes.com/cdn/shop/files/MRP0478.jpg"
            alt="Kids bikes"
          />
          <div className="overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="subtitle">Предстоящее путешествие начинается здесь</p>
            <h1>Детские велосипеды</h1>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="intro-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="intro-content"
        >
          <h2>Приступим</h2>
          <div className="divider"></div>
          <p>
            Учитесь кататься? Начните здесь. Просто, надежно и с несколькими размерами колес, 
            чтобы подойти для разных возрастных групп детей
          </p>
        </motion.div>
      </section>

      <section className="products-section">
        {isLoading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-container">
            {products.map(product => (
              <KidsProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="slider-section">
        <h2>Другие категории</h2>
        <div className="divider"></div>
        
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          className="category-slider"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div whileHover={{ y: -5 }} className="slide-card">
                <img src={slide.image} alt={slide.title} />
                <div className="slide-content">
                  <h3>{slide.title}</h3>
                  <Link to={slide.link} className="slide-link">
                    Подробнее
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default KidsBikes;