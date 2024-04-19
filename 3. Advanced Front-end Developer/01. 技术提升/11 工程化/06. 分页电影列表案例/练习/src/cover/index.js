// console.log("cover");

import $ from "jquery";
import styles from "./index.module.less";
import videoUrl from "@/assets/movie.mp4";
import audioUrl from "@/assets/music.mp3";

/**
 * 使用jquery创建一些元素，并加入到 #app中
 */
function init() {
  // 添加容器
  const container = $("<div>").addClass(styles.container).appendTo("#app");
  // 添加视频
  const vdo = $("<video>")
    .prop("src", videoUrl)
    .prop("autoplay", true)
    .prop("muted", true)
    .prop("loop", true)
    .appendTo(container);
  // 添加音频
  const ado = $("<audio>")
    .prop("src", audioUrl)
    .prop("autoplay", true)
    .prop("muted", false)
    .prop("loop", true)
    .appendTo(container);
  // 添加文本
  // $("<p>").text("豆瓣音乐").addClass(styles.text).appendTo(container);
  $("<p>").text("TOP RATED MOVIES").addClass(styles.text).appendTo(container);
  // 滚动条注册滚动事件
  $(window).on("scroll", function () {
    // 获取滚动条滚动的距离
    let scrollTop = document.documentElement.scrollTop;
    // 获取浏览器窗口高度
    let clientHeight = document.documentElement.clientHeight;
    // console.log(scrollTop, clientHeight);
    if (scrollTop >= clientHeight) {
      vdo[0].pause();
      ado[0].pause();
    } else {
      vdo[0].play();
      ado[0].play();
    }
  });
}
init();
