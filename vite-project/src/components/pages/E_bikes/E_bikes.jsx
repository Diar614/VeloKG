import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchSidebar from "../SearchSidebar";
import { Link } from "react-router-dom";

const E_bikes = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);

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

  return (
    <div>
      <div
        className="w-full h-[800px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/collections/Print_AltitudePowerplay_MRiga_GoldenBC-2.jpg?v=1682020223&width=2000')",
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
  <h1 className="text-7xl sm:text-6xl md:text-7xl font-bold leading-tight pt-5">
    Powerplay E-bikes
  </h1>
  <p className="pt-12 text-xl sm:text-lg md:text-xl text-center leading-relaxed max-w-5xl mx-auto">
    Разрабатывая первый в истории Rocky Mountain eMTB, мы отказались быть
    заложниками существующих конструкций привода. Мы построили привод, подходящий
    к велосипеду, а не наоборот. Десять лет наши инженеры мечтали, создавали,
    тестировали и тщательно улучшали Dyname, пока не добились нужного результата.
    Привод Dyname компактный, мощный и плавный.
  </p>
  <div className="pt-15">

  </div>
</div>

      </div>
    </div>
  );
};

export default E_bikes;
