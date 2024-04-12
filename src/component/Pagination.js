import React from "react";
import "../css/component.css";

function Pagination({ totalElement, onePageElement, pageNum, setPageNum }) {
  const pageList = [];
  const totalPage = Math.ceil(totalElement / onePageElement);

  const prevPage = () => {
    if (pageNum === 1) {
      alert("첫 페이지입니다.");
    } else {
      setPageNum(pageNum - 1);
    }
  };
  const nextPage = () => {
    if (pageNum === pageList.length) {
      alert("마지막 페이지입니다.");
    } else {
      setPageNum(pageNum + 1);
    }
  };

  for (let i = 1; i <= totalPage; i++) {
    pageList.push(i);
  }

  return (
    <div className="postPagination">
      <button onClick={prevPage}>{"<<"}</button>
      {pageList.map((page) => {
        return (
          <button
            key={page}
            className={pageNum === page ? "pageBtn" : null}
            onClick={() => setPageNum(page)}
          >
            {page}
          </button>
        );
      })}
      <button onClick={nextPage}>{">>"}</button>
    </div>
  );
}

export default Pagination;
