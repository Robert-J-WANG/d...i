import $ from "jquery";
import styles from "./index.module.less";

let container = null;
/**
 * 初始化函数，负责创建容器
 */
function init() {
  container = $("<div>").addClass(styles.container).appendTo("#app");
}

init();

/**
 * 根据传入的电影数组，创建元素，填充到容器中
 * @params movies 电影数组
 */
export function createMovieTags(movies) {
  console.log(movies);
  const html = movies
    .map((m) => {
      return `
    <div>
      <a href=${m.url} target="_blank"><img src=${m.cover} alt=""></a>
      <a href=${m.url} target="_blank"><p>${m.title}</p></a>
      <p>${m.rate}</p>
    </div>`;
    })
    .join("");
  console.log(html);
  container.html(html);
}
