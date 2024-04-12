import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailTitle, setDetailTitle] = useState("");
  const [detailDate, setDetailDate] = useState("");
  const [detailBody, setDetailBody] = useState("");

  const deletePost = async () => {
    await axios.delete(`http://localhost:5000/post/${id}`).then((res) => {
      alert(res.data.message);
      navigate("/post");
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`).then((res) => {
      setDetailTitle(res.data.title);
      setDetailDate(res.data.date);
      setDetailBody(res.data.body);
    });
  }, [id]);

  return (
    <div className="postDetail">
      <div>
        <button onClick={() => navigate(`/post/${id}/update`)}>수정</button>
        <button onClick={deletePost}>삭제</button>
      </div>
      <div className="upDetailContainer">
        <h1>{detailTitle}</h1>
        <div>
          <p>작성날짜 : {detailDate}</p>
          <p>작성자 : 익명</p>
        </div>
      </div>
      <div>
        <p>{detailBody}</p>
      </div>
    </div>
  );
}

export default PostDetail;
