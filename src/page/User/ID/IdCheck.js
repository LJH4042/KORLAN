import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/user.css";

function IdCheck() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const fetchUsername = async () => {
    const email = localStorage.getItem("email");
    const emailData = { email: email };
    try {
      await axios
        .post("http://localhost:5000/check_id", emailData)
        .then((res) => setUsername(res.data.username));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="userContainer">
      <h1>아이디 찾기</h1>
      <h2>ID : {username}</h2>
      <button
        className="submitBtn"
        onClick={() => {
          navigate("/login");
          localStorage.removeItem("email");
        }}
      >
        로그인
      </button>
    </div>
  );
}

export default IdCheck;