import React from "react";
import magnifier from "../../img/magnifier.svg";
import user from "../../img/user.svg";
import heart from "../../img/heart.svg";
import cart from "../../img/cart.svg";

const Header = ({ isSearchVisible, setSearchVisible }) => {
  return (
    <header className="bg-black text-white flex pt-10 font-thin pl-[35%]">
      <p>TRADE IN</p>
      <p className="pl-8">ВЕЛОСИПЕДЫ</p>
      <p className="pl-8">ЗАПЧАСТИ</p>
      <p className="pl-8">ЕКИПИРОВКА</p>
      <p className="pl-8">АКСЕССУАРЫ</p>
      <p className="pl-8">ВЕЛОСТАНКИ</p>

      <img
        className="pl-14 cursor-pointer"
        src={magnifier}
        alt=""
        onClick={() => setSearchVisible(!isSearchVisible)}
      />
      <img className="pl-8" src={user} alt="User" />
      <img className="pl-8" src={heart} alt="Heart" />
      <img className="pl-8" src={cart} alt="Cart" />
    </header>
  );
};

export default Header;
