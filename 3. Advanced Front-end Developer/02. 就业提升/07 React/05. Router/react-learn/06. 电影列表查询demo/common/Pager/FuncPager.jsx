import React from "react";
import "./Pager.css";

/**
 *
 * @param {*} props
 * currentPage :当前页数
 * pageNumber :页容量
 * totalPage :总页数
 * handerClick :回调函数
 * @returns
 */
export default function Pager(props) {
  const {
    currentPage = 1,
    // pageNumber, //设置默认值
    totalPage,
    handerClick,
  } = props;

  let pageNumber = totalPage <= 10 ? totalPage : 10;
  const min = getMin(currentPage, pageNumber, totalPage);
  const max = getMax(min, pageNumber);
  const pageNumbers = getPageNumbers(min, max);
  if (!totalPage) {
    return null;
  }
  return (
    <div className="pageContainer">
      {/* 首页 */}
      <span
        className={`pager ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = 1;
          handerClick(targetPage);
        }}
      >
        {"|<<"}
      </span>
      {/* 上一页 */}
      <span
        className={`pager ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = currentPage <= 1 ? 1 : currentPage - 1;
          handerClick(targetPage);
        }}
      >
        {"<"}
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
        {">"}
      </span>

      {/* 尾页 */}
      <span
        className={`pager ${currentPage === totalPage ? "disabled" : ""}`}
        onClick={() => {
          const targetPage = totalPage;
          handerClick(targetPage);
        }}
      >
        {">>|"}
      </span>
      <span className="pager show">
        {currentPage} / {totalPage}
      </span>
    </div>
  );
}

// 辅助函数
function getMin(currentPage, pageNumber, totalPage) {
  let minNumber = currentPage - Math.floor(pageNumber / 2);
  // 当总页数少于页码数时，将最小页码设为1
  if (totalPage <= pageNumber) {
    minNumber = 1;
  } else {
    // 确保不小于 1
    minNumber = Math.max(minNumber, 1);
    // 确保不大于 totalPage - pageNumber + 1
    minNumber = Math.min(minNumber, totalPage - pageNumber + 1);
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
