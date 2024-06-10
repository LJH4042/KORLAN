import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import Logo from "../logo.svg";
import axios from "axios";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resetGameData = () => {
    axios.post("http://localhost:5000/game/reset");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 화면 너비가 480이하일 때 메뉴를 닫는 함수
  const closeMenusOnMobile = () => {
    if (window.innerWidth <= 480) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={Logo} alt="Logo" />
      </Link>

      <div className="menuIcon" onClick={toggleMobileMenu}>
        &#9776;
      </div>

      <div className={`menuContainer ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink className="navbarMenu" exact to={"/"} activeClassName="active" onClick={closeMenusOnMobile}>
          홈
        </NavLink>
        <NavLink className="navbarMenu" to={"/post"} activeClassName="active" onClick={closeMenusOnMobile}>
          커뮤니티
        </NavLink>
        <NavLink className="navbarMenu" to={"/learn"} activeClassName="active" onClick={closeMenusOnMobile}>
          학습하기
        </NavLink>
        <div
          className={`navbarMenu dropdown ${isDropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          게임하기
          {isDropdownOpen && (
            <div className="dropdown-content">
              <NavLink to={"/imageGame"} onClick={(e) => { resetGameData(); closeMenusOnMobile(); }} activeClassName="active">
                이미지 게임
              </NavLink>
              <NavLink to={"/combineGame"} onClick={(e) => { resetGameData(); closeMenusOnMobile(); }} activeClassName="active">
                낱말 조합
              </NavLink>
            </div>
          )}
        </div>
        <NavLink className="navbarMenu" to={"/myPage"} activeClassName="active" onClick={closeMenusOnMobile}>
          마이페이지
        </NavLink>
      </div>

      <div className={`authContainer ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink className="navbarAuth" to={"/login"} activeClassName="active" onClick={closeMenusOnMobile}>
          로그인
        </NavLink>
        <NavLink className="navbarAuth" to={"/register"} activeClassName="active" onClick={closeMenusOnMobile}>
          회원가입
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
