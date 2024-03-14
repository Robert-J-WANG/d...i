import React, { Component } from "react";
import MovablePanel from "./MovablePanel";
import MovablePoint from "./MovablePoint";
import MoveLister from "./MoveLister";

export default class MovableTest extends Component {
  renderPanel = (state) => {
    return (
      <div
        className="box"
        style={{
          left: state.x,
          top: state.y,
        }}
      ></div>
    );
  };
  renderPoint = (state) => {
    return (
      <div>
        <h1>x坐标： {state.x}</h1>
        <h1>y坐标：{state.y}</h1>
      </div>
    );
  };
  render() {
    return (
      <>
        {/* 不使用render.props方法：2个组件除了渲染部分，其他的代码完全重复 */}
        <MovablePanel />
        <MovablePoint />
        {/* 使用render.props方法：抽离相同的代码，通过回调函数的返回值，渲染不同的内容 */}
        <MoveLister render={this.renderPanel} />
        <MoveLister render={this.renderPoint} />
      </>
    );
  }
}
