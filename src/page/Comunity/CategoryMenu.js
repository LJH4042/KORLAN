import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryMenu({ postList, setCategoryMenu, setPageNum }) {
  const navigate = useNavigate();

  const allPost = () => {
    setCategoryMenu(postList);
    setPageNum(1);
  };
  const freePost = () => {
    setCategoryMenu(postList.filter((post) => post.category === "자유 게시판"));
    setPageNum(1);
  };
  const tradePost = () => {
    setCategoryMenu(postList.filter((post) => post.category === "물품 거래"));
    setPageNum(1);
  };
  const imforPost = () => {
    setCategoryMenu(postList.filter((post) => post.category === "정보 공유"));
    setPageNum(1);
  };
  const connectPost = () => {
    setCategoryMenu(postList.filter((post) => post.category === "만남의 광장"));
    setPageNum(1);
  };

  return (
    <div className="btnList">
      <button onClick={allPost}>전체</button>
      <button onClick={freePost}>자유 게시판</button>
      <button onClick={tradePost}>물품 거래</button>
      <button onClick={imforPost}>정보 공유</button>
      <button onClick={connectPost}>만남의 광장</button>
      <button className="addBtn" onClick={() => navigate("/post/add")}>
        + 글쓰기
      </button>
    </div>
  );
}

export default CategoryMenu;
