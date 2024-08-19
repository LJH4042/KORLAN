import React, { useState, useEffect } from "react";
import "../../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "../../component/Timer";

function ActionPanel({ signIn, slide }) {
  const heading = signIn ? "또박또박" : "또박또박";
  const paragraph = signIn
    ? "내 정보를 사용하기 위해 계정을 만듭니다."
    : "내 정보를 사용하기 위해 로그인합니다.";
  const button = signIn ? "회원가입" : "로그인";

  return (
    <div className="Panel ActionPanel">
      <h2>{heading}</h2>
      <p>{paragraph}</p>
      <button onClick={slide}>{button}</button>
    </div>
  );
}

function FormPanel({ signIn, handleLoginSubmit }) {
  const heading = signIn ? "로그인" : "회원가입";

  const inputs = [
    {
      type: "text",
      placeholder: "아이디",
      name: "username",
    },
    {
      type: "password",
      placeholder: "비밀번호",
      name: "password",
    },
  ];

  if (!signIn) {
    inputs.push({
      type: "password",
      placeholder: "비밀번호 확인하기",
      name: "confirmPassword",
    });
    inputs.push({
      type: "text",
      placeholder: "이메일",
      name: "email",
    });
    inputs.push({
      type: "text",
      placeholder: "인증번호",
      name: "authCode",
    });
  }

  const link_id = {
    href: "/find_id",
    text: "ID를 잊으셨나요?",
  };
  const link_pwd = {
    href: "/find_pwd",
    text: "비밀번호를 잊으셨나요?",
  };

  const button = signIn ? "로그인" : "회원가입";

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    authCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(formValues);
  };

  const sendAuthCode = async () => {
    const { email } = formValues;
    if (!email) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/send-auth-code",
        { email }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending auth code:", err);
      alert("인증번호 전송에 실패했습니다.");
    }
  };

  const verifyAuthCode = async () => {
    const { authCode } = formValues;
    if (!authCode) {
      alert("인증번호를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/verify-auth-code",
        { authCode }
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error verifying auth code:", err);
      alert("인증번호 확인에 실패했습니다.");
    }
  };

  return (
    <div className="Panel FormPanel">
      <h2>{heading}</h2>

      <form onSubmit={handleSubmit}>
        {inputs.map(({ type, placeholder, name }) => (
          <div key={name} className="input-container">
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              value={formValues[name]}
              onChange={handleChange}
            />
            {name === "email" && !signIn && (
              <button
                type="button"
                onClick={sendAuthCode}
                className="auth-button"
              >
                전송
              </button>
            )}
            {name === "authCode" && !signIn && (
              <button
                type="button"
                onClick={verifyAuthCode}
                className="auth-button"
              >
                확인
              </button>
            )}
          </div>
        ))}
        <button type="submit">{button}</button>
      </form>
      {signIn && <a href={link_id.href}>{link_id.text}</a>}
      {signIn && <a href={link_pwd.href}>{link_pwd.text}</a>}
    </div>
  );
}

function Login() {
  const [signIn, setSignIn] = useState(true);
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const slide = () => {
    if (transition) {
      return;
    }

    const formPanel = document.querySelector(".FormPanel");
    const actionPanel = document.querySelector(".ActionPanel");
    const actionPanelChildren = actionPanel.children;

    const formBoundingRect = formPanel.getBoundingClientRect();
    const actionBoundingRect = actionPanel.getBoundingClientRect();

    formPanel.style.transition = "all 0.7s cubic-bezier(.63,.39,.54,.91)";
    actionPanel.style.transition = "all 0.7s cubic-bezier(.63,.39,.54,.91)";
    [...actionPanelChildren].forEach(
      (child) =>
        (child.style.transition = "all 0.35s cubic-bezier(.63,.39,.54,.91)")
    );

    setTransition(true);

    if (signIn) {
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });

      formPanel.style.borderRadius = "0 20px 20px 0";
      actionPanel.style.borderRadius = "20px 0 0 20px";
    } else {
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${
          -actionBoundingRect.width / 2
        }px)`;
        child.style.opacity = 0;
        child.style.visibility = "hidden";
      });

      formPanel.style.borderRadius = "20px 0 0 20px";
      actionPanel.style.borderRadius = "0 20px 20px 0";
    }

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = "none";
        child.style.transform = `translateX(${
          signIn ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3
        }%)`;
      });

      setSignIn(!signIn);
    }, 350);

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = "all 0.35s cubic-bezier(.63,.39,.54,.91)";
        child.style.transform = `translateX(0)`;
        child.style.opacity = 1;
        child.style.visibility = "visible";
      });
    }, 400);

    setTimeout(() => {
      formPanel.style.transition = "none";
      actionPanel.style.transition = "none";
      formPanel.style.transform = "translate(0)";
      actionPanel.style.transform = "translate(0)";
      actionPanel.style.order = signIn ? -1 : 1;

      setTransition(false);
    }, 700);
  };

  const handleLoginSubmit = async (formValues) => {
    const { username, password } = formValues;

    if (username === "" || password === "") {
      alert("빈칸을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Error response:", err.response);
      }
    }
  };

  return (
    <div className="App">
      <FormPanel signIn={signIn} handleLoginSubmit={handleLoginSubmit} />
      <ActionPanel signIn={signIn} slide={slide} />
    </div>
  );
}

export default Login;

/*import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/user.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    if (username === "" || password === "") alert("빈칸을 입력해주세요.");
    else {
      try {
        await axios
          .post("http://localhost:5000/login", loginData, {
            withCredentials: true,
          })
          .then((res) => {
            alert(res.data.message);
            const { token } = res.data;
            localStorage.setItem("token", token);
          });
        navigate("/");
        window.location.reload();
      } catch (err) {
        setUsernameError(err.response.data.nameMessage);
        setPasswordError(err.response.data.pwdMessage);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="userContainer">
      <h3>로그인</h3>
      <p></p>
      <form onSubmit={loginSubmit} className="formContainer">
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
          <h4>{passwordError}</h4>
        </div>
        <button className="submitBtn" type="submit">
          로그인
        </button>
      </form>
      <div className="findDiv">
        <button className="findBtn" onClick={() => navigate("/find_id")}>
          아이디 찾기
        </button>
        <button className="findBtn2" onClick={() => navigate("/find_pwd")}>
          비밀번호 찾기
        </button>
      </div>
      <p onClick={() => navigate("/register")}>계정 생성하기</p>
    </div>
  );
}

export default Login;*/
