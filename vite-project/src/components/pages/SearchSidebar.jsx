import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchSidebar = ({ isSearchVisible, setSearchVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const links = [
    { to: "/", label: "Главная" },
    { to: "/E_bikes", label: "Электронные велосипеды" },
    { to: "/enduro", label: "Ендуро велосипеды" },
    { to: "/freerideBike", label: "Фрирайд велосипеды" },
    { to: "/gravelBike", label: "Гравийные велосипеды" },
    { to: "/crossCountry", label: "Велосипеды для кросс каунтри" },
    { to: "/kidsBikes", label: "Детские велосипеды" },
    { to: "/trailBikes", label: "Велосипеды для трейла" },
    { to: "/", label: "Поддержка" },
  ];

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "ig");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="text-black">
          {part}
        </span>
      ) : (
        <span key={index} className="text-gray-500">
          {part}
        </span>
      )
    );
  };

  return (
    <>
      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={() => setSearchVisible(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-150 m-4 bg-white shadow-lg z-50"
          >
            <div className="p-5 flex border-b relative pt-20">
              <div className="absolute bottom-0 left-0 w-full px-5 pb-5">
                <input
                  type="text"
                  placeholder="Введите..."
                  className="w-full rounded border-0 focus:outline-none text-4xl"
                  style={{
                    zIndex: 10,
                    position: "absolute",
                    bottom: "10px",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="text-2xl pt-9 pl-10 space-y-4 font-light cursor-pointer flex flex-col justify-start items-start">
              {links
                .filter((link) =>
                  link.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((link, index) => (
                  <Link key={index} to={link.to} className="transition underline-animation pl-2">
                    {highlightText(link.label, searchTerm)}
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchSidebar;