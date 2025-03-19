import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import magnifier from "../../img/magnifier.svg";
import user from "../../img/user.svg";
import heart from "../../img/heart.svg";
import cart from "../../img/cart.svg";

const Header = ({ isSearchVisible, setSearchVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false); 
  const [lastScrollY, setLastScrollY] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

 
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
   
        setIsHidden(true);
      } else {

        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);


      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-10 transition-all duration-300 z-50 ${
        isScrolled ? "bg-opacity-80 shadow-md" : "bg-transparent"
      } ${isHidden ? "transform translate-y-[-100%]" : ""}`} 
    >
      <nav className="flex items-center space-x-8 text-lg font-black pl-40 text-white">
        <p>TRADE IN</p>
        <p>Велосипеды</p>
        <p>Запчасти</p>
        <p>Екипировка</p>
      </nav>

      <div className="absolute top-1/2 left-350 transform -translate-x-[30%] -translate-y-1/2 flex items-center space-x-6">
        <img
          className="cursor-pointer transition-all duration-300"
          src={magnifier}
          onClick={() => setSearchVisible(!isSearchVisible)}
          style={{ width: "25px", height: "25px" }}
        />
        <img
          className="cursor-pointer transition-all duration-300"
          src={user}
          onClick={() => navigate("/register")}
          style={{ width: "25px", height: "25px" }}
        />
        <img
          className="transition-all duration-300"
          src={heart}
          style={{ width: "25px", height: "25px" }}
        />
        <img
          className="transition-all duration-300"
          src={cart}
          style={{ width: "25px", height: "25px" }}
        />
      </div>
    </header>
  );
};

export default Header;