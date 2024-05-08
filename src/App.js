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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
