import React, { Component } from "react";
import { PropTypes } from "prop-types";

// 专门装图片的容器
export default class ImgContainer extends Component {
  // 传递过来的属性
  static propTypes = {
    srcs: PropTypes.arrayOf(PropTypes.string), //所有图片路径的数组
    imgWidth: PropTypes.number, // 单张图片的宽度
    imgHeight: PropTypes.number, // 单张图片的高度
    duration: PropTypes.number, // 多长时间完成动画
  };
  // 自身的属性
  tick = 10; // 计时器间隔时间
  timer = null; // 计时器id

  /**
   * 切换到第几张图片
   * 调用此函数，此组件会经历一段动画，切换到对应下标的图片
   * 原理：通过重新设置容器的MarginLeft值实现
   * 方法1，使用state，通过setState方法——更符合react设计理念
   * 方法2，使用ref,获取dom,直接操作dom——更高效（这次练习中使用，开发中不常用）
   * @param {*} index 指定图片的下标
   */
  swithTo(index) {
    // console.log(this.div, index);
    /* -------------------- 1.设置正确的index -------------------- */
    if (index < 0) {
      index = 0;
    } else if (index > this.props.srcs.length - 1) {
      index = this.props.srcs.length - 1;
    }
    /* ----------------- 2.计算正确的marginLeft的值 ---------------- */
    const targetMarginLeft = -index * this.props.imgWidth;
    // console.log(targetMarginLeft);
    // 如果没有动画
    // this.div.style.marginLeft = targetMarginLeft + "px";

    /* ----------------------- 3.设置动画 ----------------------- */
    // 动画原理：一段时间内（duration），某个属性值（marginLeft），从当前数值（currentMarginLeft）变到目标值（targetMarginLeft）
    let currentMarginLeft = parseFloat(getComputedStyle(this.div).marginLeft);

    // 计算动画的次数
    const times = Math.ceil(this.props.duration / this.tick);
    // 每次变化的数值
    const step = (targetMarginLeft - currentMarginLeft) / times;
    let currentTime = 0;
    // 开启计时器前，先清空之前的计时器
    clearInterval(this.timer);
    // 开始计时器
    this.timer = setInterval(() => {
      currentTime++;
      currentMarginLeft += step;
      if (currentTime === times) {
        // 停止计时器
        clearInterval(this.timer);
        // 设置正确的currentMarginLeft，消除误差的积累
        currentMarginLeft = targetMarginLeft;
      }
      this.div.style.marginLeft = currentMarginLeft + "px";
    }, this.tick);
  }

  /**
   * 使用ref属性，获取dom元素
   * @param {*} ele
   */
  containerRef = (ele) => {
    this.div = ele;
  };

  render() {
    const imgs = this.props.srcs.map((src, i) => (
      <img
        key={i}
        src={src}
        alt=""
        style={{
          // 设置图片宽高，否则会是图片自身宽高
          width: this.props.width,
          height: this.props.height,
          // 图片是行盒，浮动转为块盒，防止出现空白折叠
          float: "left",
        }}
      />
    ));
    return (
      <div
        ref={this.containerRef}
        style={{
          width: this.props.srcs.length * this.props.imgWidth,
          height: this.props.imgHeight,
        }}
      >
        {imgs}
      </div>
    );
  }
}
