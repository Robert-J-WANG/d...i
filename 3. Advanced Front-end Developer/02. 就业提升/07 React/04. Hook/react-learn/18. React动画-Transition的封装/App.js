import React, { useState } from "react";
import FadeTransition from "./common/FadeTransition";
import "./App.css";
import { SwitchTransition } from "react-transition-group";

export default function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <SwitchTransition>
        <FadeTransition key={show}>
          <h1>{show ? "标题内容1" : "标题内容2"}</h1>
        </FadeTransition>
      </SwitchTransition>

      <button onClick={() => setShow(!show)}>切换内容</button>
    </div>
  );
}
