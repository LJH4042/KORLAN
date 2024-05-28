import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changePassword2 = (e) => setPassword2(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);

  const registerSubmit = async (e) => {
    e.preventDefault();

    const inputs = [username, password, password2, email];
    const registerData = {
      username: username,
      password: password,
      checkPassword: password2,
      email: email,
    };

    if (inputs.some((input) => input === "")) {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/register", registerData)
          .then((res) => {
            alert(res.data.message);
            navigate("/login");
          });
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setPasswordError(err.response.data.pwdMessage);
        setEmailError(err.response.data.emailMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>회원가입</h1>
      <form onSubmit={registerSubmit}>
        <div>
          <label>ID</label>
          <input type="text" value={username} onChange={changeUsername} />
          <h4>{usernameError}</h4>
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={changePassword} />
          <h4>{null}</h4>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" value={password2} onChange={changePassword2} />
          <h4>{passwordError}</h4>
        </div>
        <div>
          <label>이메일</label>
          <input
            type="text"
            value={email}
            onChange={changeEmail}
            placeholder="ex) admin@aaa.com"
          />
          <h4>{emailError}</h4>
        </div>
        <button className="submitBtn" type="submit">
          회원가입
        </button>
      </form>
      <p onClick={() => navigate("/")}>-#로그인-</p>
    </div>
  );
}

export default Register;
