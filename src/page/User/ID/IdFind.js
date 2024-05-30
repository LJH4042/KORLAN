import React, { useEffect, useState } from "react";
import "../../../css/user.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IdFind() {
  const navigate = useNavigate();

  const [isFind, setIsFind] = useState(false);

  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [emailError, setEmailError] = useState("");
  const [authCodeError, setAuthCodeError] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changeAuthCode = (e) => setAuthCode(e.target.value);

  const IdFindSubmit = async (e) => {
    e.preventDefault();

    const idData = { email: email };

    if (email === "") {
      alert("빈칸을 입력해주세요.");
    } else {
      try {
        await axios
          .post("http://localhost:5000/find_id", idData)
          .then((res) => {
            setIsFind(true);
            alert(res.data.message);
          });
        localStorage.setItem("email", email);
      } catch (err) {
        setEmailError(err.response.data.message);
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
            navigate("/check_id");
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
      <h1>ID 찾기</h1>
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
          <form onSubmit={IdFindSubmit}>
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
            <button className="submitBtn">ID 찾기</button>
          </form>
          <p onClick={() => navigate("/login")}>-#로그인-</p>
        </div>
      )}
    </div>
  );
}

export default IdFind;