import React, { useState } from "react";
import axios from "axios";

function ImageRegist() {
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const changeImageTitle = (e) => setImageTitle(e.target.value);
  const changeImageFile = (e) => setImageFile(e.target.files[0]);

  const addImage = async (e) => {
    e.preventDefault();

    const imageData = {
      title: imageTitle,
      image: imageFile,
    };

    if (imageTitle === "" || imageFile === null) {
      alert("이미지 파일을 등록해주세요.");
    } else {
      await axios
        .post("http://localhost:5000/game", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          alert(res.data.message);
          setImageTitle("");
          setImageFile(null);
        });
    }
  };

  return (
    <div>
      <h2>이미지 올리기</h2>
      <form onSubmit={addImage}>
        <div>
          <label>이름</label>
          <input
            type="text"
            value={imageTitle || ""}
            onChange={changeImageTitle}
          />
        </div>
        <div>
          <label>이미지</label>
          <input type="file" accept="image/*" onChange={changeImageFile} />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default ImageRegist;
