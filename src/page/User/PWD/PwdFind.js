import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/user.css";

function PwdFind() {
  const navigate = useNavigate();

  const [isFind, setIsFind] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [authCodeError, setAuthCodeError] = useState("");

  const changeUsername = (e) => setUsername(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changeAuthCode = (e) => setAuthCode(e.target.value);

  const pwdFindSubmit = async (e) => {
    e.preventDefault();

    const pwdData = { username: username, email: email };

    if (username === "" || email === "") {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/find_pwd", pwdData)
          .then((res) => {
            alert(res.data.message);
            setIsFind(true);
          });
        localStorage.setItem("username", username);
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setEmailError(err.response.data.emailMessage);
      }
    }
  };

  const submitAuthCode = async (e) => {
    e.preventDefault();

    if (authCode === "") {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/authcode", { code: authCode })
          .then((res) => {
            alert(res.data.message);
            navigate("/change_pwd");
          });
      } catch (err) {
        setAuthCodeError(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>비밀번호 찾기</h1>
      {isFind ? (
        <div>
          <form onSubmit={submitAuthCode}>
            <div>
              <label>인증코드(4자리, 3분)</label>
              <input type="text" value={authCode} onChange={changeAuthCode} />
              <h4>{authCodeError}</h4>
            </div>
            <button type="submit" className="submitBtn">
              인증
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={pwdFindSubmit}>
            <div>
              <label>ID</label>
              <input type="text" value={username} onChange={changeUsername} />
              <h4>{usernameError}</h4>
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
            <button type="submit" className="submitBtn">
              다음
            </button>
          </form>
          <p onClick={() => navigate("/login")}>-#로그인-</p>
        </div>
      )}
    </div>
  );
}

export default PwdFind;
