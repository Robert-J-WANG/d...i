import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "animate.css";

export default function App() {
  const [showCom1, setShowCom1] = useState(true);
  return (
    <div className="container">
      <div className="comp-container">
        <SwitchTransition>
          <CSSTransition appear timeout={1000} key={showCom1}>
            <h1>{showCom1 ? "组件1" : "组件2"}</h1>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <button onClick={() => setShowCom1(!showCom1)}>显示组件1 / 组件2</button>
    </div>
  );
}
