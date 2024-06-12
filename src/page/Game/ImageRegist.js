import React, { useState } from "react";
import axios from "axios";
import "../../css/user.css";

function ImageRegist() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("");
  const [length, setLength] = useState("");
  const [hint, setHint] = useState("");

  const addImage = async (e) => {
    e.preventDefault();
    const inputs = [title, level, length, hint];
    const imageData = { title, image, level, length, hint };
    if (inputs.some((input) => input === "") || image === null)
      alert("빈칸을 입력해주세요.");
    else {
      await axios
        .post("http://localhost:5000/game", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => alert(res.data.message));
      window.location.reload();
    }
  };

  return (
    <div className="userContainer">
      <h2>이미지 올리기</h2>
      <form onSubmit={addImage}>
        <div>
          <label>이름</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>이미지</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>난이도</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="none">--------</option>
            <option value="상">상</option>
            <option value="중">중</option>
            <option value="하">하</option>
          </select>
        </div>
        <div>
          <label>글자 수</label>
          <select value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="none">--------</option>
            <option value="1">1글자</option>
            <option value="2">2글자</option>
            <option value="3">3글자</option>
            <option value="4">4글자</option>
          </select>
        </div>
        <div>
          <label>힌트</label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default ImageRegist;
