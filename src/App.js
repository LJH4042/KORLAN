import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/User/Login";
import Register from "./page/User/Register";
import PostAdd from "./page/Comunity/PostAdd";
import PostList from "./page/Comunity/PostList";
import PostDetail from "./page/Comunity/PostDetail";
import PostUpdate from "./page/Comunity/PostUpdate";
import Home from "./page/Home";
import ImageRegist from "./page/Game/ImageRegist";
import ImageGame from "./page/Game/ImageGame";
import CombineGame from "./page/Game/CombineGame";
import IdFind from "./page/User/ID/IdFind";
import PwdFind from "./page/User/PWD/PwdFind";
import PwdChange from "./page/User/PWD/PwdChange";
import MyPage from "./page/User/MyPage";
import IdCheck from "./page/User/ID/IdCheck";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find_id" element={<IdFind />} />
          <Route path="/check_id" element={<IdCheck />} />
          <Route path="/find_pwd" element={<PwdFind />} />
          <Route path="/change_pwd" element={<PwdChange />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/post" element={<PostList />} />
          <Route path="/post/add" element={<PostAdd />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/:id/update" element={<PostUpdate />} />
          <Route path="/image/add" element={<ImageRegist />} />
          <Route path="/imageGame" element={<ImageGame />} />
          <Route path="/combineGame" element={<CombineGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;