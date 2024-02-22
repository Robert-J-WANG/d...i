import $ from "jquery";
import styles from "./index.module.less";
import { getMovies } from "@/api/movie";
import { createMovieTags } from "../list";
let container;
/**
 * 初始化函数，负责创建容器
 */
function init() {
  container = $("<div>").addClass(styles.pager).appendTo("#app");
}

init();

/**
 * 根据传入的页码、页容量、总记录数，创建分页区域的标签
 * @params page 页码
 * @params limit 页容量
 * @params total 总页数
 */
export function createPagers(page, limit, total) {
  container.empty();
  /**
   * 辅助函数，负责帮忙创建一个页码标签
   * @params text 标签的文本
   * @params status 标签的状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
   */
  function _createTag(text, status, targetPage) {
    const span = $("<span>")
      .text(text)
      .addClass(styles[status])
      .appendTo(container);
    if (status === "") {
      span.on("click", async function () {
        /* ---------------------- 点击过后干什么？ ---------------------- */
        // 1. 重新拿数据
        const resp = await getMovies(targetPage, 30);
        // console.log(resp);
        // 2. 重新生成列表
        createMovieTags(resp.data.movieList);
        // 3. 重新生成分页区域
        createPagers(targetPage, 30, resp.data.movieTotal);
      });
    }
  }

  // 获取尾页数
  const lastPage = Math.ceil(total / limit);
  //1. 创建首页标签
  _createTag("|<<", page === 1 ? "disabled" : "", 1);
  //2. 创建上一页标签
  _createTag("<<", page === 1 ? "disabled" : "", page - 1);
  //3. 创建数字页码标签
  // _createTag("1", "active", 1);
  const pageCount = 10;
  let minPageCount = Math.floor(page - pageCount / 2);
  minPageCount < 1 && (minPageCount = 1);
  minPageCount > lastPage - pageCount + 1 &&
    (minPageCount = lastPage - pageCount + 1);
  let maxPageCount = minPageCount + pageCount - 1;
  maxPageCount > lastPage && (maxPageCount = lastPage);

  for (let i = minPageCount; i <= maxPageCount; i++) {
    _createTag(i, i === page ? "active" : "", i);
  }
  //4. 创建下一页标签
  _createTag(">>", page === lastPage ? "disabled" : "", page + 1);
  //5. 创建尾页标签
  _createTag(">>|", page === lastPage ? "disabled" : "", lastPage);
}
