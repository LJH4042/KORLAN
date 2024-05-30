import { Link } from "react-router-dom";
import React from "react";
import './Nav.css';
import Logo from '../logo.png';

function Nav() {
  return (
    <div className="navbar">
      <Link to={'/'}>
        <img className="logo" src={Logo} />
      </Link>
      <Link className="navbarMenu" to={'/'}>홈</Link>
      <Link className="navbarMenu" to={'/LearningPage'}>학습하기</Link>
      {/* <Link className="navbarMenu" to={'/Game'}>게임하기</Link> */
        <Link className="navbarMenu" to={'/myPage'}>마이페이지</Link>}
    </div>
  );
}

export default Nav;