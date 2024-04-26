import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

function Comp1({ visable }) {
  return (
    <CSSTransition in={visable} appear timeout={1000}>
      <h1 className="title">组件1</h1>
    </CSSTransition>
  );
}
function Comp2({ visable }) {
  return (
    <CSSTransition mountOnEnter in={visable} timeout={1000}>
      <h1 className="title">组件2</h1>
    </CSSTransition>
  );
}
export default function App() {
  const [showCom1, setShowCom1] = useState(true);
  return (
    <div className="container">
      <div className="comp-container">
        <Comp1 visable={showCom1} />
        <Comp2 visable={!showCom1} />
      </div>
      <button onClick={() => setShowCom1(!showCom1)}>显示组件1 / 组件2</button>
    </div>
  );
}
