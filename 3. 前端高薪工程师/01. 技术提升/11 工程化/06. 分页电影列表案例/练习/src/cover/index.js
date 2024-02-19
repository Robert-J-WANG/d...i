// console.log("cover");

import $ from "jquery";
import styles from "./index.module.less";

/**
 * 使用jquery创建一些元素，并加入到 #app中
 */
function init() {
  $("<h1>").text("封面模块").addClass(styles.cover).appendTo("#app");
}
init();
