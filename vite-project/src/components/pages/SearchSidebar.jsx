import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SearchSidebar = ({ isSearchVisible, setSearchVisible }) => {
  useEffect(() => {
    if (isSearchVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchVisible]);

  return (
    <>
      {isSearchVisible && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={() => setSearchVisible(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-150 m-4 bg-white shadow-lg transition-transform duration-300 z-50 ${
          isSearchVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex  border-b relative pt-20">
          <div className="absolute bottom-0 left-0 w-full px-5 pb-5">
            <input
              type="text"
              placeholder="Введите..."
              className="w-full rounded border-0 focus:outline-none text-5xl"
              style={{
                zIndex: 10,
                position: "absolute",
                bottom: "10px",
              }}
            />
          </div>
        </div>
        <div className="text-2xl pt-9 pl-10 space-y-4 font-light cursor-pointer flex flex-col justify-start items-start">
          <h1 className="transition underline-animation pl-2">Велосипеды</h1>
          <Link to="/E_bikes" className="transition underline-animation pl-2">
            Электронные велосипеды
          </Link>
          <h1 className="transition underline-animation pl-2">Запчасти</h1>
          <Link to="/" className="transition underline-animation pl-2">
           Поддержка
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
