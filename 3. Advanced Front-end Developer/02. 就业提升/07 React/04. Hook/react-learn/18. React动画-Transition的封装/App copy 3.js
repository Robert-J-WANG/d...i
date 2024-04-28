import React, { useState } from "react";
import FadeTransition from "./common/FadeTransition";
import "./App.css";

export default function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="container">
      <FadeTransition in={show} timeout={1000}>
        <h1>标题内容</h1>
      </FadeTransition>

      <button onClick={() => setShow(!show)}>显示/隐藏</button>
    </div>
  );
}
