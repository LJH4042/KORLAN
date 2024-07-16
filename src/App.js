import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Nav";
import Login from "./page/User/Login";
import Register from "./page/User/Register";
import Home from "./page/Home";
import ImageRegist from "./page/Game/ImageRegist";
import IdFind from "./page/User/ID/IdFind";
import PwdFind from "./page/User/PWD/PwdFind";
import MyPage from "./page/User/MyPage";
import LearningPage from "./page/Learn/LearningPage";
import Footer from "./component/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Introduce from "./page/introduce";
import Introduce from "./page/notebook";
import ImageLevel from "./page/Game/ImageLevel";
import CombineLevel from "./page/Game/CombineLevel";
import axios from "axios";

function App() {
  const checkToken = async () => {
    if (localStorage.getItem("token") === null) {
      try {
        const refreshRes = await axios.post(
          "http://localhost:5000/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = refreshRes.data.token;
        localStorage.setItem("token", newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } catch (err) {
        if (err.response.status === 403) {
          return null;
        }
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find_id" element={<IdFind />} />
          <Route path="/find_pwd" element={<PwdFind />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/image/add" element={<ImageRegist />} />
          <Route path="/imageGame" element={<ImageLevel />} />
          <Route path="/combineGame" element={<CombineLevel />} />
          <Route path="/learn" element={<LearningPage />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
