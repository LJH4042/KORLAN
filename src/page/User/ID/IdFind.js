import React, { useEffect, useState } from "react";
import "../../../css/user.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthInput from "../authInput";
import IdCheck from "./IdCheck";

function IdFind() {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [isFind, setIsFind] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const IdFindSubmit = async (e) => {
    e.preventDefault();
    const idData = { email: email };
    if (email === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/find_id", idData)
          .then((res) => alert(res.data.message));
        setIsAuth(true);
        setIsFind(false);
      } catch (err) {
        setEmailError(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>ID 찾기</h1>
      {isAuth && (
        <AuthInput
          setIsAuth={setIsAuth}
          setIsFind={setIsFind}
          setIsCheck={setIsCheck}
        />
      )}
      {isCheck && <IdCheck emailer={email} />}
      {isFind && (
        <div>
          <form onSubmit={IdFindSubmit}>
            <div>
              <label>이메일</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex) admin@aaa.com"
              />
              <h4>{emailError}</h4>
            </div>
            <button className="submitBtn">ID 찾기</button>
          </form>
          <p onClick={() => navigate("/login")}>로그인</p>
        </div>
      )}
    </div>
  );
}

export default IdFind;
