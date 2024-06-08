import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";
import Timer from "../../component/Timer";

function Register() {
  const navigate = useNavigate();

  const [isTimer, setIsTimer] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [authCodeError, setAuthCodeError] = useState("");

  //이메일 인증 확인 함수
  const mailSendCode = async (e) => {
    e.preventDefault();
    if (email === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/mailsend", { email: email })
          .then((res) => alert(res.data.message));
        setIsTimer(false);
      } catch (err) {
        alert(err.response.data.message);
        setEmailError(err.response.data.emailMessage);
      }
    }
  };

  //인증코드 확인 함수
  const submitAuthCode = async (e) => {
    e.preventDefault();
    if (authCode === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/authcode", { code: authCode })
          .then((res) => alert(res.data.message));
        setAuthCodeError("");
        setIsSubmit(true);
        setIsTimer(true);
      } catch (err) {
        setAuthCodeError(err.response.data.message);
      }
    }
  };

  //회원가입 함수
  const registerSubmit = async (e) => {
    e.preventDefault();
    const inputs = [username, password, password2, email];
    const registerData = {
      username: username,
      password: password,
      checkPassword: password2,
      email: email,
    };
    if (inputs.some((input) => input === "")) alert("빈칸을 입력해주세요.");
    else if (isSubmit === false) alert("이메일 인증을 해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/register", registerData)
          .then((res) => alert(res.data.message));
        navigate("/login");
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setPasswordError(err.response.data.pwdMessage);
        setEmailError(err.response.data.emailMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h3>회원가입</h3>
      <form onSubmit={registerSubmit} className="formContainer">
        <div>
          <label>ID</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h4>{usernameError}</h4>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h4>{null}</h4>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <h4>{passwordError}</h4>
        </div>
        <div>
          <label>이메일</label>
          <div className="checkUser">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex) admin@aaa.com"
            />
            <button onClick={mailSendCode}>인증코드 전송</button>
          </div>
          <h4>{emailError}</h4>
        </div>
        <div>
          <label>
            인증코드(6자리)
            <span>{!isTimer && <Timer setIsFind={setIsTimer} />}</span>
          </label>
          <div className="checkUser">
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button onClick={submitAuthCode}>인증</button>
          </div>
          <h4>{authCodeError}</h4>
        </div>
        <button className="submitBtn" type="submit">
          회원가입
        </button>
      </form>
      <p onClick={() => navigate("/login")}>로그인</p>
    </div>
  );
}

export default Register;
