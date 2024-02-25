import React, { Component } from "react";
import Ball from "./Ball";
import { getRandom } from "../utils";
export default class Balls extends Component {
  state = {
    ballInfo: [
      {
        //   top: 0,
        //   left: 0,
        //   xSpeed: 100,
        //   ySpeed: 100,
        //   backgroundColor: "blue",
      },
    ],
  };
  constructor(props) {
    super(props);
    const ballMaxCount = 30; // 最多多少个球？
    let timer = setInterval(() => {
      const newBall = createBall();
      if (this.state.ballInfo.length > ballMaxCount) {
        clearInterval(timer);
      }
      this.setState({ ballInfo: [...this.state.ballInfo, newBall] });
    }, 2000);
  }
  render() {
    const { ballInfo } = this.state;
    let balls = ballInfo.map((ball, index) => <Ball {...ball} key={index} />);
    return <>{balls}</>;
  }
}

/**
 * 创建一些随机的小球的数据
 * @returns  小球数据对象
 */
function createBall() {
  return {
    top: getRandom(0, document.documentElement.clientWidth),
    left: getRandom(0, document.documentElement.clientHeight),
    xSpeed: getRandom(50, 500),
    ySpeed: getRandom(50, 500),
    backgroundColor: `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(
      0,
      255
    )}`,
  };
}
