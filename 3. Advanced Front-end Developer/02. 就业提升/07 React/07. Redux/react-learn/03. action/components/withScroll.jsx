import React from "react";
import setScroll from "./setScroll";

export default function withScrop(Comp) {
  return class ScropWrapper extends React.Component {
    componentDidMount() {
      // 滚动条复原方法1：
      // window.scrollTo(0, 0);
      // 滚动条复原方法2：添加过渡效果
      setScroll();
    }
    render() {
      return (
        <>
          <Comp {...this.props} />
        </>
      );
    }
  };
}
