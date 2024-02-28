import React from "react";
import "./Pager.less";

export default function Pager(props) {
  const { currentPage, pageNumber, lastPage, handerClick } = props;
  const min = getMin(currentPage, pageNumber, lastPage);
  const max = getMax(min, pageNumber);
  const pageNumbers = getPageNumbers(min, max);
  return (
    <div className="container">
      {/* 首页 */}
      <span
        className={`pager ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = 1;
          handerClick(targetPage);
        }}
      >
        首页
      </span>
      {/* 上一页 */}
      <span
        className={`pager ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = currentPage <= 1 ? 1 : currentPage - 1;
          handerClick(targetPage);
        }}
      >
        上一页
      </span>
      {/* 数字页 */}
      {pageNumbers.map((page, i) => (
        <span
          key={i}
          className={`pager ${currentPage === page ? "active" : ""}`}
          onClick={() => {
            const targetPage = page;
            handerClick(targetPage);
          }}
        >
          {page}
        </span>
      ))}
      {/* 下一页 */}
      <span
        className={`pager ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={() => {
          const targetPage =
            currentPage >= lastPage ? lastPage : currentPage + 1;
          handerClick(targetPage);
        }}
      >
        下一页
      </span>

      {/* 尾页 */}
      <span
        className={`pager ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = lastPage;
          handerClick(targetPage);
        }}
      >
        尾页
      </span>
    </div>
  );
}

function getMin(currentPage, pageNumber, lastPage) {
  let minNumber = currentPage - pageNumber / 2;
  if (minNumber <= 1) {
    minNumber = 1;
  }
  if (minNumber >= lastPage - pageNumber + 1) {
    minNumber = lastPage - pageNumber + 1;
  }
  return minNumber;
}

function getMax(minNumber, pageNumber) {
  return minNumber + pageNumber - 1;
}
function getPageNumbers(minNumber, maxNumber) {
  let pageNumbers = [];
  for (let i = minNumber; i <= maxNumber; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
