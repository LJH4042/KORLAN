import React, { useState, useEffect } from 'react';
import '../../css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Timer from "../../component/Timer";

function ActionPanel({ signIn, slide }) {
  const heading = signIn ? '또박또박' : '또박또박';
  const paragraph = signIn
    ? '내 정보를 사용하기 위해 계정을 만듭니다.'
    : '내 정보를 사용하기 위해 로그인합니다.';
  const button = signIn ? '회원가입' : '로그인';

  return (
    <div className="Panel ActionPanel">
      <h2>{heading}</h2>
      <p>{paragraph}</p>
      <button onClick={slide}>{button}</button>
    </div>
  );
}

function FormPanel({ signIn, handleLoginSubmit }) {
  const heading = signIn ? '로그인' : '회원가입';

  const inputs = [
    {
      type: 'text',
      placeholder: '아이디',
      name: 'username',
    },
    {
      type: 'password',
      placeholder: '비밀번호',
      name: 'password',
    },
  ];

  if (!signIn) {
    inputs.push({
      type: 'password',
      placeholder: '비밀번호 확인하기',
      name: 'confirmPassword',
    });
  }

  if (!signIn) {
    inputs.push({
      type: 'text',
      placeholder: '이메일',
      name: 'email',
    });
  }

  if (!signIn) {
    inputs.push({
      type: 'text',
      placeholder: '인증번호',
      name: 'authBtn',
    });
  }

  const link = {
    href: '/find_pwd',
    text: '비밀번호를 잊으셨나요?',
  };

  const button = signIn ? '로그인' : '회원가입';

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
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

  return (
    <div className="Panel FormPanel">
      <h2>{heading}</h2>

      <form onSubmit={handleSubmit}>
        {inputs.map(({ type, placeholder, name }) => (
          <input
            type={type}
            key={placeholder}
            placeholder={placeholder}
            name={name}
            value={formValues[name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">{button}</button>
      </form>
      {signIn && <a href={link.href}>{link.text}</a>}
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

    const formPanel = document.querySelector('.FormPanel');
    const actionPanel = document.querySelector('.ActionPanel');
    const actionPanelChildren = actionPanel.children;

    const formBoundingRect = formPanel.getBoundingClientRect();
    const actionBoundingRect = actionPanel.getBoundingClientRect();

    formPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    actionPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)';
    [...actionPanelChildren].forEach(
      (child) => (child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)')
    );

    setTransition(true);

    if (signIn) {
      formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });

      formPanel.style.borderRadius = '0 20px 20px 0';
      actionPanel.style.borderRadius = '20px 0 0 20px';
    } else {
      formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`;
      actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`;

      [...actionPanelChildren].forEach((child) => {
        child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`;
        child.style.opacity = 0;
        child.style.visibility = 'hidden';
      });

      formPanel.style.borderRadius = '20px 0 0 20px';
      actionPanel.style.borderRadius = '0 20px 20px 0';
    }

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = 'none';
        child.style.transform = `translateX(${
          signIn ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3
        }%)`;
      });

      setSignIn(!signIn);
    }, 350);

    setTimeout(() => {
      [...actionPanelChildren].forEach((child) => {
        child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)';
        child.style.transform = `translateX(0)`;
        child.style.opacity = 1;
        child.style.visibility = 'visible';
      });
    }, 400);

    setTimeout(() => {
      formPanel.style.transition = 'none';
      actionPanel.style.transition = 'none';
      formPanel.style.transform = 'translate(0)';
      actionPanel.style.transform = 'translate(0)';
      actionPanel.style.order = signIn ? -1 : 1;

      setTransition(false);
    }, 700);
  };

  const handleLoginSubmit = async (formValues) => {
    const { username, password } = formValues;

    if (username === '' || password === '') {
      alert('빈칸을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', { username, password }, {
        withCredentials: true,
      });
      alert(res.data.message);
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      // 오류를 무시하고 최소한의 작업만 수행합니다.
      console.error('Error:', err);
      if (err.response) {
        console.error('Error response:', err.response);
      }
    }
  };

  return (
    <div className="App">
      <FormPanel 
        signIn={signIn} 
        handleLoginSubmit={handleLoginSubmit} 
      />
      <ActionPanel signIn={signIn} slide={slide} />
    </div>
  );
}

export default Login;
