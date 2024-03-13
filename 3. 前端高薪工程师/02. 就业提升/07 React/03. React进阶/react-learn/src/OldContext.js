import React, { Component } from "react";
import PropTypes from "prop-types";

// 全局变量报错属性值类型
const types = {
  a: PropTypes.number,
  b: PropTypes.string.isRequired,
  onChangeA: PropTypes.func,
};

class ChildA extends Component {
  static contextTypes = types;

  /* ------------------ 设置子组件ChildA自身的上下文 ----------------- */
  static childContextTypes = {
    a: PropTypes.number,
    c: PropTypes.string,
  };

  getChildContext() {
    return {
      a: 789,
      c: "hello",
    };
  }

  render() {
    console.log("A组件中打印的父组件OldContext的context");
    console.log(this.context);
    return (
      <div>
        <h1>ChildA</h1>
        <h2>
          a:{this.context.a}，b:{this.context.b}
        </h2>
        <ChildB />
      </div>
    );
  }
}

class ChildB extends React.Component {
  /**
   * 声明需要使用哪些上下文中的数据
   */
  static contextTypes = {
    ...types,
    c: PropTypes.string,
  };

  render() {
    console.log("B组件中打印的祖组件OldContext的context");
    // 孙组件的this.context对象中，来自父组件ChildA的属性会覆盖掉来自祖组件OldContext的属性a
    console.log(this.context);
    return (
      <p>
        ChildB，来自于上下文的数据：a: {this.context.a}, b:{this.context.b}
        ，c: {this.context.c}
        <button
          onClick={() => {
            this.context.onChangeA(this.context.a + 2);
          }}
        >
          子组件的按钮，a+2
        </button>
      </p>
    );
  }
}

export default class OldContext extends Component {
  /**
   * 步骤1：
   * 使用childContextTypes对象约束上下文中数据的类型
   */
  static childContextTypes = types;

  state = {
    a: 123,
    b: "abc",
  };

  /**
   * 步骤2：
   * 使用getChildContext()方法得到上下文中的数据
   */
  getChildContext() {
    // console.log("获取新的上下文");
    return {
      a: this.state.a,
      b: this.state.b,
      onChangeA: (newA) => {
        this.setState({
          a: newA,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <ChildA />
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
            });
          }}
        >
          a加1
        </button>
      </div>
    );
  }
}
