import React, { useState } from "react";
import Timer from "../../component/Timer";
import "../../css/user.css";
import axios from "axios";

function AuthInput({ setIsAuth, setIsFind, setIsCheck }) {
  const [authCode, setAuthCode] = useState("");
  const [authCodeError, setAuthCodeError] = useState("");

  const submitAuthCode = async (e) => {
    e.preventDefault();
    if (authCode === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/authcode", { code: authCode })
          .then((res) => alert(res.data.message));
        setIsAuth(false);
        setIsCheck(true);
      } catch (err) {
        setAuthCodeError(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitAuthCode}>
        <div>
          <label>
            인증코드(6자리)
            {<Timer setIsAuth={setIsAuth} setIsFind={setIsFind} />}
          </label>
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <h4>{authCodeError}</h4>
        </div>
        <button type="submit" className="submitBtn">
          인증
        </button>
      </form>
    </div>
  );
}

export default AuthInput;
