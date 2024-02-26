import $ from "jquery";
import styles from "./index.module.less";

// TMDB 电影图片和链接地址的前缀
const IMG_Ex = "https://media.themoviedb.org/t/p/w440_and_h660_face";
const LINK_EX = "https://www.themoviedb.org/movie/";

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
  // const html = movies
  //   .map((m) => {
  //     return `
  //   <div>
  //     <a href=${m.url} target="_blank"><img src=${m.cover} alt=""></a>
  //     <a  href=${m.url} target="_blank"><p class='${styles.title}'>${m.title}</p></a>
  //     <p class='${styles.rate}'>评分：${m.rate}</p>
  //   </div>`;
  //   })
  //   .join("");

  const html = movies
    .map((m) => {
      return `
    <div>
      <a href=${LINK_EX + m.id} target="_blank"><img src=${
        IMG_Ex + m.backdrop_path
      } alt=""></a>
      <a  href=${m.url} target="_blank"><p class='${styles.title}'>${
        m.title
      }</p></a>
      <p class='${styles.rate}'>Rate：${m.vote_average}</p>
    </div>`;
    })
    .join("");

  container.html(html);
}
