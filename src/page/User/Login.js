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
    <div className="LoginPage">
      <div className="LoginContainer">
        <h2 className="LoginTitle">로그인</h2>
        <span className="LoginSubTitle">-로그인하여 서비스를 이용하세요.-</span>
        <form onSubmit={loginSubmit}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
            />
            <h4>{usernameError}</h4>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
            <h4>{passwordError}</h4>
          </div>
          <button className="LoginSubmitBtn" type="submit">
            로그인
          </button>
        </form>
        <div className="LoginSpanDiv">
          <span className="LoginSpan" onClick={() => navigate("/find_id")}>
            아이디 찾기
          </span>
          <span>
            <></> / <></>
          </span>
          <span className="LoginSpan" onClick={() => navigate("/find_pwd")}>
            비밀번호 찾기
          </span>
        </div>
        <p onClick={() => navigate("/register")}>계정 생성하기</p>
      </div>
    </div>
  );
}

export default Login;
