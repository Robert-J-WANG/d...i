import React from "react";
import "./Pager.less";

/**
 *
 * @param {*} props
 * currentPage :当前页数
 * @returns
 */
export default function Pager(props) {
  const { currentPage, pageNumber, totalPage, handerClick } = props;
  const min = getMin(currentPage, pageNumber, totalPage);
  const max = getMax(min, pageNumber);
  const pageNumbers = getPageNumbers(min, max);
  if (!totalPage) {
    return null;
  }
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
        className={`pager ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={() => {
          const targetPage =
            currentPage >= totalPage ? totalPage : currentPage + 1;
          handerClick(targetPage);
        }}
      >
        下一页
      </span>

      {/* 尾页 */}
      <span
        className={`pager ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = totalPage;
          handerClick(targetPage);
        }}
      >
        尾页
      </span>
      <span className="pager show">
        {currentPage} / {totalPage}
      </span>
    </div>
  );
}

function getMin(currentPage, pageNumber, totalPage) {
  let minNumber = currentPage - pageNumber / 2;
  if (minNumber <= 1) {
    minNumber = 1;
  }
  if (minNumber >= totalPage - pageNumber + 1) {
    minNumber = totalPage - pageNumber + 1;
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
