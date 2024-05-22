import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeCheckPassword = (e) => setCheckPassword(e.target.value);

  const registerSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      username: username,
      password: password,
      chackPassword: checkPassword,
    };

    if (username === "" || password === "" || checkPassword === "") {
      alert("아이디, 비밀번호를 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/register", registerData)
          .then((res) => {
            alert(res.data.message);
            navigate("/");
          });
      } catch (err) {
        alert(err.response.data.message);
        setUsername("");
        setPassword("");
        setCheckPassword("");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/main");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>회원가입</h1>
      <form onSubmit={registerSubmit}>
        <div>
          <label>아이디</label>
          <input type="text" value={username} onChange={changeUsername} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={changePassword} />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={checkPassword}
            onChange={changeCheckPassword}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <p onClick={() => navigate("/")}>-#로그인-</p>
    </div>
  );
}

export default Register;
