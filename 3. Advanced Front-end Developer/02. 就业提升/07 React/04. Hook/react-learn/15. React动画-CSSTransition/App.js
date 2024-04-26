import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import "animate.css";

// CSSTransition样式名对象
const myClassNames = {
  // 退出
  exitActive: "animate__fadeOutLeft",
  exitDone: "my-exit-done",
  // 进入
  enterActive: "animate__fadeInRight",
  enterDone: "animate__jello",
  // 页面初次加载时
  appearActive: "animate__fadeInRight",
};
/**
 * 用于使用CSSTransitio组件实现动画过渡效果
 * @param {*}
 * visable: boolean 控制是否进入过渡状态
 * children: node 组件显示的内容
 * @returns
 */
function MyTransition({ visable, children }) {
  return (
    <CSSTransition
      in={visable}
      mountOnEnter
      appear
      timeout={1000}
      classNames={myClassNames}
    >
      {children}
    </CSSTransition>
  );
}

export default function App() {
  const [showCom1, setShowCom1] = useState(true);
  return (
    <div className="container">
      <div className="comp-container">
        <MyTransition visable={showCom1}>
          <h1 className="title animate__animated animate__fast">组件1</h1>
        </MyTransition>
        <MyTransition visable={!showCom1}>
          <h1 className="title animate__animated animate__fast">组件2</h1>
        </MyTransition>
      </div>
      <button onClick={() => setShowCom1(!showCom1)}>显示组件1 / 组件2</button>
    </div>
  );
}
