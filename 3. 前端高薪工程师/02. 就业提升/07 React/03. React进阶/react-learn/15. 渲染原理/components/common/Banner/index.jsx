import React, { Component } from "react";
import "./index.css";
import { PropTypes } from "prop-types";
import ImgContainer from "./ImgContainer";
import SwitchArrows from "./SwitchArrows";
import SwitchDots from "./SwitchDots";

// 轮播图容器
export default class Banner extends Component {
  state = {
    index: 0, // 初始化显示图片的index
  };
  timer = null; // 自动切换图片计时器的id
  // 设置属性类型
  static propTypes = {
    width: PropTypes.number.isRequired, // 容器宽度
    height: PropTypes.number.isRequired, // 容器高度
    imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired, // 图片路径
    autoChangeDuration: PropTypes.number.isRequired, // 自动切换图片的间隔
    duration: PropTypes.number.isRequired, // 完成一次切换需要的时间
  };
  // 设置默认值
  static defaultProps = {
    width: 520,
    height: 280,
    imgSrcs: [],
    autoChangeDuration: 3000,
    duration: 1000,
  };

  imgContainerRef = (ele) => {
    this.imgContainer = ele;
  };

  /**
   * 处理切换图片
   * @param {*} index  切换到第几张
   */
  handleSwitch = (index) => {
    // 得到imgContainer组件对象
    // console.log(this.imgContainer);
    // 调用imgContainer组件对象中的swithTo()方法
    this.setState({ index: index });
    this.imgContainer.swithTo(index);
  };

  handleChange = (arrow) => {
    let curIndex = this.state.index;
    // console.log(arrow);
    if (arrow === "left") {
      curIndex--;
      curIndex = curIndex < 0 ? 0 : curIndex;
    }
    if (arrow === "right") {
      curIndex++;
      curIndex =
        curIndex > this.props.imgSrcs.length - 1
          ? this.props.imgSrcs.length - 1
          : curIndex;
    }
    this.handleSwitch(curIndex);
  };
  /**
   *  自动切换图片的方法
   */
  autoSwitch = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let curIndex = this.state.index;
      curIndex = (curIndex + 1) % this.props.imgSrcs.length;
      this.handleSwitch(curIndex);
    }, this.props.autoChangeDuration);
  };

  /**
   * 停止自动切换
   */
  stopAutoSwitch = () => {
    clearInterval(this.timer);
  };

  componentDidMount() {
    this.autoSwitch();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div
        className="banner-container"
        style={{ width: this.props.width, height: this.props.height }}
        onMouseEnter={() => this.stopAutoSwitch()}
        onMouseLeave={() => this.autoSwitch()}
      >
        <ImgContainer
          ref={this.imgContainerRef}
          srcs={this.props.imgSrcs}
          imgWidth={this.props.width}
          imgHeight={this.props.height}
          duration={this.props.duration}
        />

        <SwitchArrows onChange={this.handleChange} />
        <SwitchDots
          total={this.props.imgSrcs.length}
          curIndex={this.state.index}
          onChange={(i) => {
            this.setState({ index: i });
            this.handleSwitch(i);
          }}
        />
      </div>
    );
  }
}
