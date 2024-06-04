import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../css/Nav.css";
import Logo from "../logo.png";
import axios from "axios";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const resetGameData = () => {
    axios.post("http://localhost:5000/game/reset");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={Logo} />
      </Link>

      <div className="menuContainer">
        <Link className="navbarMenu" to={"/"}>
          홈
        </Link>
        <Link className="navbarMenu" to={"/post"}>
          커뮤니티
        </Link>
        <Link className="navbarMenu" to={"/learn"}>
          학습하기
        </Link>
        <Link className="navbarMenu" to={"/myPage"}>
          마이페이지
        </Link>
        <div
          className="navbarMenu dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          게임하기
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to={"/imageGame"} onClick={resetGameData}>
                이미지 게임
              </Link>
              <Link to={"/combineGame"} onClick={resetGameData}>
                낱말 조합
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="authContainer">
        <Link className="navbarAuth" to={"/login"}>
          로그인
        </Link>
        <Link className="navbarAuth" to={"/register"}>
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Nav;
