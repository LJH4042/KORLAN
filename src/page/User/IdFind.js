import React, { useEffect, useState } from "react";
import "../../css/user.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IdFind() {
  const navigate = useNavigate();

  const [isFind, setIsFind] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [emailError, setEmailError] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);

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
            setUsername(res.data.username);
            setIsFind(true);
          });
      } catch (err) {
        setEmailError(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/main");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h1>ID 찾기</h1>
      {isFind ? (
        <div>
          <h2>ID : {username}</h2>
          <button className="submitBtn" onClick={() => navigate("/")}>
            로그인
          </button>
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
          <p onClick={() => navigate("/")}>-#로그인-</p>
        </div>
      )}
    </div>
  );
}

export default IdFind;
