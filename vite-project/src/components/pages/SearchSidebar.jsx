import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchSidebar = ({ isSearchVisible, setSearchVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isSearchVisible) {
      document.body.style.overflow = "hidden";
      // Фокусируем поле ввода при открытии
      const timer = setTimeout(() => {
        const input = document.querySelector(".search-input");
        if (input) input.focus();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setSearchTerm(""); // Сбрасываем поиск при закрытии
      setHasSearched(false);
    }
  }, [isSearchVisible]);

  const links = [
    { to: "/", label: "Главная" },
    { to: "/Bikes", label: "Все велосипеды" },
    { to: "/enduro", label: "Ендуро велосипеды" },
    { to: "/freerideBike", label: "Фрирайд велосипеды" },
    { to: "/gravelBike", label: "Гравийные велосипеды" },
    { to: "/kidsBikes", label: "Детские велосипеды" },
    { to: "/AskQuestion", label: "Задать вопрос" },
    { to: "/orders", label: "История заказов" },
  ];

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "ig");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className="font-medium text-indigo-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchVisible(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 pt-4 px-6 pb-2 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="search-input w-full py-4 text-3xl font-light border-0 focus:outline-none focus:ring-0 placeholder-gray-300"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 space-y-3">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.to}
                      className="block py-3 px-3 rounded-lg transition-colors duration-200"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => setSearchVisible(false)}
                      style={{
                        backgroundColor:
                          hoveredItem === index ? "#f3f4f6" : "transparent",
                      }}
                    >
                      <p className="text-xl font-light">
                        {highlightText(link.label, searchTerm)}
                      </p>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-400 text-lg">
                    {hasSearched
                      ? "Ничего не найдено"
                      : "Начните вводить для поиска"}
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4">
              <button
                onClick={() => setSearchVisible(false)}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchSidebar;