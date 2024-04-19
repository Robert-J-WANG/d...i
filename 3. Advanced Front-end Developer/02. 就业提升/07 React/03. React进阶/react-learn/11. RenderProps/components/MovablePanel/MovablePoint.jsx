import React from "react";
import "./index.css";

export default class MovablePoint extends React.PureComponent {
  state = {
    x: 0,
    y: 0,
  };

  divRef = React.createRef();

  handleMouseMove = (e) => {
    //更新x和y的值
    const { left, top } = this.divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    this.setState({
      x,
      y,
    });
  };

  render() {
    return (
      <div
        ref={this.divRef}
        className="panel"
        onMouseMove={(e) => this.handleMouseMove(e)}
      >
        <h1>x坐标： {this.state.x}</h1>
        <h1>y坐标：{this.state.y}</h1>
      </div>
    );
  }
}
