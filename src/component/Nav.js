import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import Logo from "../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faBook,
  faGamepad,
  faImage,
  faPuzzlePiece,
  faPen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="menuIcon" onClick={toggleMobileMenu}></div>
      <div className={`menuContainer ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/introduce"}
          onClick={closeMenusOnMobile}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          소개
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/learn"}
          onClick={closeMenusOnMobile}
        >
          <FontAwesomeIcon icon={faBook} className="icon" />
          학습하기
        </NavLink>
        <div
          className={`navbarMenu dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faGamepad} className="icon" />
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
                <FontAwesomeIcon icon={faImage} className="icon" />
                이미지 게임
              </NavLink>
              <NavLink
                to={"/combineGame"}
                onClick={(e) => closeMenusOnMobile()}
                className={({ isActive }) =>
                  isActive ? "navbarMenu active" : "navbarMenu"
                }
              >
                <FontAwesomeIcon icon={faPuzzlePiece} className="icon" />
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
          <FontAwesomeIcon icon={faPen} className="icon" />
          연습장
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbarMenu active" : "navbarMenu"
          }
          to={"/teamIntro"}
          onClick={closeMenusOnMobile}
        >
          <FontAwesomeIcon icon={faUsers} className="icon" />
          개발팀
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
