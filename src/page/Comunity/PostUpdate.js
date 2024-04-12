import React, { useEffect, useState } from "react";
import "../../css/comunity.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PostUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateCategory, setUpdateCategory] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");

  const changeUpdateCategory = (e) => setUpdateCategory(e.target.value);
  const changeUpdateTitle = (e) => setUpdateTitle(e.target.value);
  const changeUpdateBody = (e) => setUpdateBody(e.target.value);

  const updateForm = async (e) => {
    e.preventDefault();

    const updatePostData = {
      category: updateCategory,
      title: updateTitle,
      body: updateBody,
    };

    if (updateCategory === "none" || updateTitle === "" || updateBody === "") {
      alert("카테고리, 제목, 본문을 입력해주세요.");
    } else {
      axios
        .put(`http://localhost:5000/post/${id}/update`, updatePostData)
        .then((res) => {
          alert(res.data.message);
          navigate("/post");
        });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`).then((res) => {
      setUpdateCategory(res.data.category);
      setUpdateTitle(res.data.title);
      setUpdateBody(res.data.body);
    });
  }, [id]);

  return (
    <div className="postForm">
      <h1>게시글 수정</h1>
      <form onSubmit={updateForm}>
        <div>
          <label>카테고리</label>
          <select value={updateCategory} onChange={changeUpdateCategory}>
            <option value="none">--------</option>
            <option value="자유 게시판">자유 게시판</option>
            <option value="물품 거래">물품 거래</option>
            <option value="정보 공유">정보 공유</option>
            <option value="만남의 광장">만남의 광장</option>
          </select>
        </div>
        <div>
          <label>제목</label>
          <input type="text" value={updateTitle} onChange={changeUpdateTitle} />
        </div>
        <div>
          <label>본문</label>
          <textarea value={updateBody} onChange={changeUpdateBody} />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default PostUpdate;
