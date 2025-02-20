import React, { useEffect } from "react";

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
        className={`fixed top-0 right-0 h-full w-150 m-4 bg-white shadow-lg transition-transform duration-300 z-50 ${isSearchVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b relative">
          <div className="absolute bottom-0 left-0 w-full px-5 pb-5">
            <input
              type="text"
              placeholder="Введите..."
              className="w-full rounded border-0 focus:outline-none text-2xl pt-10"
              style={{ zIndex: 10 }}
            />
          </div>
     
        </div>
        <div className="text-3xl pt-9 pl-10 space-y-4 font-bold cursor-pointer">
          <h1>Велосипеды</h1>
          <h1>Электронные велосипеды</h1>
          <h1>Запчасти</h1>
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
