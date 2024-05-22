import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username: username, password: password };

    if (username === "" || password === "") {
      alert("ID, 비밀번호를 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/login", loginData)
          .then((res) => {
            alert(res.data.message);
            const { token } = res.data;
            localStorage.setItem("token", token);
            navigate("/main");
          });
      } catch (err) {
        alert(err.response.data.message);
        setUsername("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/main");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>로그인</h1>
      <p></p>
      <form onSubmit={loginSubmit}>
        <div>
          <label>아이디</label>
          <input type="text" value={username} onChange={changeUsername} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={changePassword} />
        </div>
        <button type="submit">로그인</button>
      </form>
      <p onClick={() => navigate("/register")}>-#계정 생성-</p>
    </div>
  );
}

export default Login;
