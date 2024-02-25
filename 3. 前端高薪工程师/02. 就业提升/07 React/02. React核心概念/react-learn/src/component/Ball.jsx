import React, { Component } from "react";
import "./Ball.css";

export default class Ball extends Component {
  state = {
    left: this.props.left || 0,
    top: this.props.top || 0,
    xSpeed: this.props.xSpeed || 100,
    ySpeed: this.props.ySpeed || 100,
    backgroundColor: this.props.backgroundColor || "#f60",
  };
  constructor(props) {
    super(props);
    const duration = 16;
    setInterval(() => {
      let { left, top, xSpeed, ySpeed } = this.state;
      let disX = (xSpeed * duration) / 1000;
      let disY = (ySpeed * duration) / 1000;
      let newLeft = left + disX;
      let newTop = top + disY;
      // 边界判断
      if (newLeft < 0) {
        newLeft = 0;
        this.setState({ xSpeed: -xSpeed });
      } else if (newLeft > document.documentElement.clientWidth - 100) {
        newLeft = document.documentElement.clientWidth - 100;
        this.setState({ xSpeed: -xSpeed });
      }
      if (newTop < 0) {
        newTop = 0;
        this.setState({ ySpeed: -ySpeed });
      } else if (newTop > document.documentElement.clientHeight - 100) {
        newTop = document.documentElement.clientHeight - 100;
        this.setState({ ySpeed: -ySpeed });
      }
      this.setState({ left: newLeft, top: newTop });
    }, duration);
  }

  render() {
    return (
      <div
        className="ball"
        style={{
          left: this.state.left,
          top: this.state.top,
          backgroundColor: this.state.backgroundColor,
        }}
      ></div>
    );
  }
}
