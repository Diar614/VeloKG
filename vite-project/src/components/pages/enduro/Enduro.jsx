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
        className="w-full h-[1100px] relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bikes.com/cdn/shop/files/Web_Altitude_MRiga_RGauvin_KamloopsBC_MRP1186_2.jpg?v=1711491319&width=2000')",
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
        <div className="absolute inset-0 flex justify-center text-white sm:pt-40 lg:pt-60 px-4 sm:px-8 lg:px-16">
          <h1 className="text-7xl sm:text-6xl md:text-7xl leading-tight pt-50">
            Велосипеды для эндуро
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center text-center py-20">
        <h1 className="text-6xl font-bold mb-6">
          Что такое катание на горных велосипедах эндуро?
        </h1>

        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5 pr-24">
          Эндуро-катание на горных велосипедах уходит корнями в гонки на эндуро.
          В гонках на эндуро гонщики соревнуются на определённых участках
          (обычно на спусках), но между ними они должны перемещаться. Таким
          образом, эндуро-катание на горных велосипедах в некоторых аспектах
          похоже на катание на скоростных спусках. Велосипеды сконструированы
          так, чтобы обеспечить невероятный уровень мастерства при спуске.
          Однако эндуро-велосипеды отличаются от скоростных или
          <Link
            to="/freerideBike"
            className="underline pl-2 cursor-pointer hover:text-blue-700"
          >
            фрирайд-велосипедов
          </Link>{" "}
          тем, что они намного универсальны. Они очень хорошо взбираются
          на холмы, несмотря на свою массивность, в то время как велосипед для
          скоростного спуска практически бесполезен, если только он не едет, ну,
          вниз по склону.
          <p className="pt-5">
            В то время как эндуро-маунтинбайк уходит корнями в гонки,
            эндуро-велосипеды являются популярным вариантом для гонщиков,
            которые хотят спускаться по крутым трассам, но при этом хотят иметь
            возможность эффективно подниматься в гору и преодолевать крутые
            участки.
          </p>
        </p>
      </div>
      <div className="pt-20">
        <h1 className="pl-40 text-5xl max-w-2xl">
          Исследуйте наши эндуро-велосипеды
        </h1>
        <div className="pt-10">
          <div className="flex justify-center pt-10">
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
        </div>
      </div>
      <div className="flex items-center justify-center text-center py-20">
        <h1 className="text-6xl font-bold mb-6">
          Почему я должен выбрать горный велосипед enduro, а не трейловый?
        </h1>

        <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5">
          Если вам действительно не терпится как можно быстрее промчаться по
          крутым, труднопроходимым тропам, купите велосипед для эндуро. Вы
          по-прежнему сможете прокатиться с друзьями на трейл-байках, но вы
          будете в восторге от спусков и труднопроходимых участков тропы.
          Конечно, на подъемах вам придется немного тяжелее, так что если вам
          важно мастерство в подъемах и сохранение темпа на равнинных участках,
          то выбирайте трейл-байк. Но если вам нравится спускаться с горы как
          можно быстрее (и иногда кататься в парке), выбирайте эндуро.
        </p>
      </div>
    </div>
  );
};

export default E_bikes;
