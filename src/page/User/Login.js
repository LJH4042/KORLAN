import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username: username, password: password };

    if (username === "" || password === "") {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/login", loginData)
          .then((res) => {
            alert(res.data.message);
            const { token } = res.data;
            localStorage.setItem("token", token);
            navigate("/");
          });
        localStorage.removeItem("email");
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setPasswordError(err.response.data.pwdMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>로그인</h1>
      <p></p>
      <form onSubmit={loginSubmit}>
        <div>
          <label>ID</label>
          <input type="text" value={username} onChange={changeUsername} />
          <h4>{usernameError}</h4>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={changePassword} />
          <h4>{passwordError}</h4>
        </div>
        <button className="submitBtn" type="submit">
          로그인
        </button>
      </form>
      <div className="findDiv">
        <button className="findBtn" onClick={() => navigate("/find_id")}>
          ID 찾기
        </button>
        <button className="findBtn2" onClick={() => navigate("/find_pwd")}>
          비밀번호 찾기
        </button>
      </div>
      <p onClick={() => navigate("/register")}>-#계정 생성-</p>
    </div>
  );
}

export default Login;
