import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../css/Nav.css";
import Logo from "../logo.png";
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

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={Logo} alt="Logo" />
      </Link>

      <div className="menuIcon" onClick={toggleMobileMenu}>
        &#9776;
      </div>

      <div className={`menuContainer ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink className="navbarMenu" exact to={"/"} activeClassName="active">
          홈
        </NavLink>
        <NavLink className="navbarMenu" to={"/post"} activeClassName="active">
          커뮤니티
        </NavLink>
        <NavLink className="navbarMenu" to={"/learn"} activeClassName="active">
          학습하기
        </NavLink>
        <div
          className="navbarMenu dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          게임하기
          {isDropdownOpen && (
            <div className="dropdown-content">
              <NavLink to={"/imageGame"} onClick={resetGameData} activeClassName="active">
                이미지 게임
              </NavLink>
              <NavLink to={"/combineGame"} onClick={resetGameData} activeClassName="active">
                낱말 조합
              </NavLink>
            </div>
          )}
        </div>
        <NavLink className="navbarMenu" to={"/myPage"} activeClassName="active">
          마이페이지
        </NavLink>
      </div>

      <div className={`authContainer ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink className="navbarAuth" to={"/login"} activeClassName="active">
          로그인
        </NavLink>
        <NavLink className="navbarAuth" to={"/register"} activeClassName="active">
          회원가입
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
