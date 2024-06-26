/* Login.js */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    if (username === "" || password === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/login", loginData, {
            withCredentials: true,
          })
          .then((res) => {
            alert(res.data.message);
            const { token } = res.data;
            localStorage.setItem("token", token);
          });
        navigate("/");
        window.location.reload();
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setPasswordError(err.response.data.pwdMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h3>로그인</h3>
      <p></p>
      <form onSubmit={loginSubmit} className="formContainer">
        <div>
          <label>ID</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h4>{usernameError}</h4>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h4>{passwordError}</h4>
        </div>
        <button className="submitBtn" type="submit">
          로그인
        </button>
      </form>
      <div className="findDiv">
        <button className="findBtn" onClick={() => navigate("/find_id")}>
          아이디 찾기
        </button>
        <button className="findBtn2" onClick={() => navigate("/find_pwd")}>
          비밀번호 찾기
        </button>
      </div>
      <p onClick={() => navigate("/register")}>계정 생성하기</p>
    </div>
  );
}

export default Login;
