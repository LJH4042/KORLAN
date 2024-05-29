import React, { useEffect, useState } from "react";
import "../../../css/user.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PwdChange() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const changeNewPassword = (e) => setPassword(e.target.value);
  const changeNewPassword2 = (e) => setPassword2(e.target.value);

  const pwdChangeSubmit = async (e) => {
    e.preventDefault();

    const inputs = [password, password2];

    const pwdData = {
      username: username,
      password: password,
      checkPassword: password2,
    };

    if (inputs.some((input) => input === "")) {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/change_pwd", pwdData)
          .then((res) => {
            alert(res.data.message);
            navigate("/login");
          });
        localStorage.removeItem("username");
      } catch (err) {
        setPasswordError(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("username") === null) navigate("/login");
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>비밀번호 변경</h1>
      <form onSubmit={pwdChangeSubmit}>
        <div>
          <label>새 비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={changeNewPassword}
          />
        </div>
        <div>
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={password2}
            onChange={changeNewPassword2}
          />
          <h4>{passwordError}</h4>
        </div>
        <button type="submit" className="submitBtn">
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}

export default PwdChange;
