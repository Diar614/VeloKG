import { Link } from "react-router-dom";
import "./KidsProductBike.css";
import React from "react";

const KidsProductBike = ({ product }) => {
  const bikes = [
    product.KidsBike1,
    product.KidsBike2,
    product.KidsBike3,
    product.KidsBike4,
    product.KidsBike5,
  ].filter(Boolean);
  if (bikes.length === 0) return null;

  return (
    <>
      {bikes.map((bike, index) => (
        <React.Fragment key={index}>
          <div className="product-card">
            <div className="product-image">
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={bike.image || "https://default-image-url.jpg"}
                  alt={bike.name}
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="product-details text-center">
              <h2>{bike.name}</h2>
              <p>{bike.description}</p>

              <Link to="/main">
                <button className="bg-red-700 px-6 py-3 font-black rounded-lg cursor-pointer hover:opacity-70 transition-opacity duration-300">
                  Смотреть велосипеды
                </button>
              </Link>
            </div>
          </div>

          {index === 0 && bikes.length > 1 && (
            <div className="text-center my-10 px-6 pt-30 pb-50">
              <h2 className="text-6xl font-bold text-gray-900 ">
                Продолжай кататься
              </h2>
              <p className="text-xl text-gray-700 mt-4">
                Справились с основными задачами? Пора переходить на Soul Jr —
                идеальный мотоцикл для опытных байкеров, готовых поднять планку.
              </p>
            </div>
          )}
          {index === 1 && bikes.length > 2 && (
            <div className="text-center my-10 px-6 pt-30 pb-50">
              <h2 className="text-6xl font-bold text-gray-900 ">
                Отправляйтесь в путь
              </h2>
              <p className="text-xl text-gray-700 mt-4">
                Пора взяться за дело всерьёз! Для детей, которые освоили основы
                и немного поездили по бездорожью, Vertex Jr — это то, что нужно,
                чтобы ехать немного быстрее, немного дальше и получать больше
                удовольствия.
              </p>
            </div>
          )}
          {index === 2 && bikes.length > 3 && (
            <div className="text-center my-10 px-6 pt-30 pb-50">
              <h2 className="text-6xl font-bold text-gray-900 ">
                Кромсайте дальше
              </h2>
              <p className="text-xl text-gray-700 mt-4">
                Модели Growler Jr, Flow Jr и Reaper предназначены для опытных
                юных райдеров. Обе модели, созданные на том же уровне, что и
                наши полноразмерные кроссовые велосипеды, предназначены для
                того, чтобы соответствовать развитию юных райдеров по мере того,
                как они становятся быстрее, увереннее и сильнее.
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default KidsProductBike;
