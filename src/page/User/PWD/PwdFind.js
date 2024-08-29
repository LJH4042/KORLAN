import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ActionPanel = ({ signIn, slide }) => {
  const heading = signIn ? '또박또박' : '또박또박';
  const paragraph = signIn ? '아이디를 잊으셨나요?' : '비밀번호를 잊으셨나요?';
  const button = signIn ? '아이디 찾기' : '비밀번호 찾기';

  return (
    <div className="Panel ActionPanel">
      <h2>{heading}</h2>
      <p>{paragraph}</p>
      <button onClick={slide}>{button}</button>
    </div>
  );
};

const FormPanel = ({ signIn, setIsAuth }) => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(""); 
  const [emailError, setEmailError] = useState("");

  const pwdFindSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "") {
      alert("빈칸을 입력해주세요.");
      return;
    }
    
    const pwdData = { username, email };
    try {
      await axios.post("http://localhost:5000/find_pwd", pwdData);
      setIsAuth(true);
    } catch (err) {
      setUsernameError(err.response?.data?.nameMessage || "");
      setEmailError(err.response?.data?.emailMessage || "");
    }
  };

  return (
    <div className="Panel FormPanel">
      <h2>{signIn ? '비밀번호 찾기' : '아이디 찾기'}</h2>
      <form onSubmit={pwdFindSubmit}>
        {signIn && (
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="아이디"
              className="input-field"
            />
            <h4>{usernameError}</h4>
          </div>
        )}
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일"
            className="input-field"
          />
          <h4>{emailError}</h4>
        </div>
        <button type="submit" className="auth-button">
          확인
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [transition, setTransition] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const slide = () => {
    if (transition) return;

    const formPanel = document.querySelector('.FormPanel');
    const actionPanel = document.querySelector('.ActionPanel');
    const actionPanelChildren = actionPanel.children;

    const formBoundingRect = formPanel.getBoundingClientRect();
    const actionBoundingRect = actionPanel.getBoundingClientRect();

    formPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    actionPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    [...actionPanelChildren].forEach(child => child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)');

    setTransition(true);

    if (signIn) {
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach(child => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });

      formPanel.style.borderRadius = '0 20px 20px 0';
      actionPanel.style.borderRadius = '20px 0 0 20px';
    } else {
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach(child => {
        child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });

      formPanel.style.borderRadius = '20px 0 0 20px';
      actionPanel.style.borderRadius = '0 20px 20px 0';
    }

    const timeoutState = setTimeout(() => {
      [...actionPanelChildren].forEach(child => {
        child.style.transition = 'none';
        child.style.transform = `translateX(${signIn ? (-actionBoundingRect.width / 3) : (actionBoundingRect.width / 3)}%)`;
      });

      setSignIn(!signIn);

      clearTimeout(timeoutState);
    }, 350);

    const timeoutChildren = setTimeout(() => {
      [...actionPanelChildren].forEach(child => {
        child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)';
        child.style.transform = `translateX(0)`;
        child.style.opacity = 1;
        child.style.visibility = 'visible';
      });
      clearTimeout(timeoutChildren);
    }, 400);

    const timeoutTransition = setTimeout(() => {
      formPanel.style.transition = 'none';
      actionPanel.style.transition = 'none';
      formPanel.style.transform = 'translate(0)';
      actionPanel.style.transform = 'translate(0)';
      actionPanel.style.order = signIn ? -1 : 1;

      setTransition(false);

      clearTimeout(timeoutTransition);
    }, 700);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="App">
      <FormPanel signIn={signIn} setIsAuth={setIsAuth} />
      <ActionPanel signIn={signIn} slide={slide} />
    </div>
  );
};

export default Login;
