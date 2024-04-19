import React, { Component } from "react";

/* ----------------------- 创建上下文部分 ---------------------- */
const ctx = React.createContext();
// console.log(ctx);
export default class MyNewContext extends Component {
  state = {
    a: 123,
    b: "abc",
    c: (newA) => {
      this.setState({ a: newA });
    },
  };
  render() {
    return (
      <ctx.Provider value={this.state}>
        <h1>MyNewContext</h1>
        <ChildA />
        <ChildB />
      </ctx.Provider>
    );
  }
}
/* ----------------------- 使用上下文部分 ---------------------- */
// 类组件使用
// 1. 必须使用静态属性contextType申明contex属性值类型
// 2.接this.context使用

class ChildA extends Component {
  // 必须使用静态属性contextType申明contex属性值类型
  static contextType = ctx;
  render() {
    return (
      <div>
        <h2>ChildA</h2>
        <p>
          {/* 直接this.context使用 */}
          a:{this.context.a}-------b:{this.context.b}
        </p>
        <button onClick={() => this.context.c(this.context.a + 2)}>
          改变a+2
        </button>
      </div>
    );
  }
}
// 函数组件使用
// 1. 使用cxt.Consumer属性组件包裹

function ChildB() {
  return (
    <ctx.Consumer>
      {(value) => {
        return (
          <div>
            <h1>ChildB</h1>
            <p>
              a:{value.a} ===== b:{value.b}
            </p>
            <button onClick={() => value.c(value.a + 2)}>改变a+2</button>
          </div>
        );
      }}
    </ctx.Consumer>
  );
}
