import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "animate.css";

export default function App() {
  const MyClassNames = {
    exit: "animate__bounceOut",
    enter: "animate__bounceIn",
  };
  const [showCom1, setShowCom1] = useState(true);
  return (
    <div className="container">
      <div className="comp-container">
        <SwitchTransition>
          <CSSTransition
            appear
            timeout={800}
            key={showCom1}
            classNames={MyClassNames}
          >
            <h1 className="animate__animated animate__fast">
              {showCom1 ? "组件1" : "组件2"}
            </h1>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <button onClick={() => setShowCom1(!showCom1)}>显示组件1 / 组件2</button>
    </div>
  );
}
