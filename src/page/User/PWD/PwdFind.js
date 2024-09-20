import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/user.css";
import AuthInput from "../authInput";
import PwdChange from "./PwdChange";

function PwdFind() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [isFind, setIsFind] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const pwdFindSubmit = async (e) => {
    e.preventDefault();
    const pwdData = { username: username, email: email };
    if (username === "" || email === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/find_pwd", pwdData)
          .then((res) => alert(res.data.message));
        setIsAuth(true);
        setIsFind(false);
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setEmailError(err.response.data.emailMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="pwdFindPage">
      <div className="pwdFindContainer">
        {!isCheck && <h1 className="pwdFindTitle">-비밀번호 찾기-</h1>}
        {!isCheck && (
          <span className="pwdFindSubTitle">-비밀번호를 잊으셨나요?-</span>
        )}
        {isAuth && (
          <AuthInput
            setIsFind={setIsFind}
            setIsCheck={setIsCheck}
            setIsAuth={setIsAuth}
          />
        )}
        {isCheck && <PwdChange name={username} />}
        {isFind && (
          <div>
            <form onSubmit={pwdFindSubmit}>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="아이디"
                  className="pwdCheckInput"
                />
                <h4>{usernameError}</h4>
              </div>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="구글 이메일"
                  className="pwdCheckInput"
                />
                <h4>{emailError}</h4>
              </div>
              <button type="submit" className="pwdFindBtn">
                다음
              </button>
            </form>
            <p onClick={() => navigate("/login")}>로그인</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PwdFind;
