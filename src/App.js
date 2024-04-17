import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/User/Login";
import Register from "./page/User/Register";
import PostAdd from "./page/Comunity/PostAdd";
import PostList from "./page/Comunity/PostList";
import PostDetail from "./page/Comunity/PostDetail";
import PostUpdate from "./page/Comunity/PostUpdate";
import Canvas from "./page/Game/Canvas";
import Home from "./page/Home";
import ImageRegist from "./page/Game/ImageRegist";
import ImageGame from "./page/Game/ImageGame";

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
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/image" element={<ImageGame />} />
          <Route path="/image/add" element={<ImageRegist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
