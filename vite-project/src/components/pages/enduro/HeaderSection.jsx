import React from "react";
import SearchSidebar from "../SearchSidebar";
import Header from "../Header";
import { motion } from "framer-motion";

const HeaderSection = ({ isSearchVisible, setSearchVisible, isHeaderVisible }) => {
  return (
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex justify-center items-center text-white sm:pt-40 lg:pt-60 px-[20%]"
      >
        <h1 className="text-7xl sm:text-6xl md:text-7xl leading-tight text-center">
          Велосипеды для эндуро
        </h1>
      </motion.div>
    </div>
  );
};

export default HeaderSection;
