import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

const duration = 2000;

// 类样式名称设置对象
const myClassNames = {
  appear: "my-appear",
  appearActive: "my-active-appear",
  appearDone: "my-done-appear",
  enter: "my-enter",
  enterActive: "my-active-enter",
  enterDone: "my-done-enter",
  exit: "my-exit",
  exitActive: "my-active-exit",
  exitDone: "my-done-exit",
};

export default function App() {
  const [visable, setVisable] = useState(true);
  return (
    <div>
      <CSSTransition
        in={visable}
        timeout={duration}
        // 1.设定类样式名称----->字符串
        // classNames="test"
        // 2.设定类样式名称----->对象
        classNames={myClassNames}
        // 3. 添加appear属性--->设定页面初次渲染时的样式
        appear
      >
        <div>I'm a CSS Transition!</div>
      </CSSTransition>
      <button onClick={() => setVisable(!visable)}>Click to Enter/Exit</button>
    </div>
  );
}
