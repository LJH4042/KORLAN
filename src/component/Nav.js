import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import Logo from "../logo.svg";
import axios from "axios";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true } //withCredentials 허용
      );
      localStorage.removeItem("token"); //accessToken 삭제
      navigate("/login"); //로그인 페이지로 이동
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={Logo} alt="Logo" />
      </Link>
      <div className="menuIcon" onClick={toggleMobileMenu}>
        &#9776;
      </div>
      <div className={`menuContainer ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/introduce"}
          onClick={closeMenusOnMobile}
        >
          소개
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/learn"}
          onClick={closeMenusOnMobile}
        >
          학습하기
        </NavLink>
        <div
          className={`navbarMenu dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          게임하기
          {isDropdownOpen && (
            <div className="dropdown-content">
              <NavLink
                to={"/imageGame"}
                onClick={(e) => closeMenusOnMobile()}
                className={({ isActive }) =>
                  isActive ? "navbarMenu active" : "navbarMenu"
                }
              >
                이미지 게임
              </NavLink>
              <NavLink
                to={"/combineGame"}
                onClick={(e) => closeMenusOnMobile()}
                className={({ isActive }) =>
                  isActive ? "navbarMenu active" : "navbarMenu"
                }
              >
                낱말 조합
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/notebook"}
          onClick={closeMenusOnMobile}
        >
          연습장
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
