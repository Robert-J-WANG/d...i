import React, { useState } from "react";
import useTime from "../../hooks/useTime";

export default function Test() {
  const [n, setN] = useState(1);
  useTime(() => {
    setN((n) => n + 1);
    console.log("定时器hook开启中..." + Math.random());
  }, 1000);
  return (
    <>
      <h1>这是一个test组件 </h1>
      <h2>numbr is : {n}</h2>
    </>
  );
}
