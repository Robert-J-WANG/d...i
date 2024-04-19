import React, { useState } from "react";
// import MovieContainer from "./components/MovieContainer";
import Test from "./components/Test";

export default function App() {
  // 控制Test组件挂载/销毁
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {/* 测试自定义useMovies hook */}
      {/* <MovieContainer /> */}
      {/* 测试自定义开关定时器hook */}
      {visible && <Test />}
      <button onClick={() => setVisible(!visible)}>显示/隐藏</button>
    </div>
  );
}
