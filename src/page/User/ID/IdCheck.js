import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/user.css";

function IdCheck({ emailer }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const fetchUsername = async () => {
    const emailData = { email: emailer };
    try {
      await axios
        .post("http://localhost:5000/check_id", emailData)
        .then((res) => setUsername(res.data.username));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="idCheckContainer">
      <h2>ID : {username}</h2>
      <button className="idCheckBtn" onClick={() => navigate("/login")}>
        로그인
      </button>
    </div>
  );
}

export default IdCheck;
