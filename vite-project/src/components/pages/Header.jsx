import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import magnifier from "../../img/magnifier.svg";
import user from "../../img/user.svg";

import cart from "../../img/cart.svg";
import "./Header.css";


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
    <header className={`header ${isScrolled ? "scrolled" : ""} ${isHidden ? "hidden" : ""}`}>
      <div className="header-icons">
        <img
          className="icon"
          src={magnifier}
          onClick={() => setSearchVisible(!isSearchVisible)}
          alt="Поиск"
        />
        <img className="icon" src={user} onClick={() => navigate("/register")}  />

        <img className="icon" src={cart} onClick={() => navigate("/Cart")}/>
        
      </div>
      
    </header>
  );
};

export default Header;
