import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import url1 from "./assets/1.jpg";
import url2 from "./assets/2.jpg";
import url3 from "./assets/3.jpg";
const urls = [url1, url2, url3];
let index = 0;
let timer;
const container = document.getElementById("root");

/* ------------------------- 1.初始化 ------------------------ */
init();

/* ------------------------- 2.交互 ------------------------- */
container.onmouseenter = stop;
container.onmouseleave = start;

/**
 * 初始化页面
 */
function init() {
  // 渲染初始图片
  render();
  //   开始动画
  start();
}

/**
 * 创建并渲染一个reactdom对象
 */
function render() {
  ReactDOM.render(<img alt="" src={urls[index]} />, container);
}

/**
 * 开启定时器，每个1秒，创建并渲染新的reactdom对象，
 */
function start() {
  stop();
  timer = setInterval(() => {
    index = (index + 1) % 3;
    render();
  }, 1000);
}

/**
 * 清除定时器
 */
function stop() {
  clearInterval(timer);
}
