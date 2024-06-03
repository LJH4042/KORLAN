import { Link } from "react-router-dom";
import React from "react";
import "../css/Nav.css";
import Logo from "../logo.png";

function Nav() {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={Logo} />
      </Link>

      <Link className="navbarMenu" to={"/"}>
        홈
      </Link>
      <Link class="navbarMenu" to={"/post"}>커뮤니티</Link>
      <Link className="navbarMenu" to={"/learn"}>
        학습하기
      </Link>
      <Link className="navbarMenu" to={"/myPage"}>
        마이페이지
      </Link>
      <Link class="navbarMenu" to={"/imageGame"}>이미지 게임</Link>
      <Link class="navbarMenu" to={"/combineGame"}>낱말 조합</Link>
      <Link class="navbarMenu" to={"/login"}>
        로그인
      </Link>
      <Link class="navbarMenu" to={"/register"}>
        회원가입
      </Link>
    </div>
  );
}

export default Nav;
