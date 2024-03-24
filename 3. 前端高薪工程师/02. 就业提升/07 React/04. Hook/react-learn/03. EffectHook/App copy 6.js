import React, { useEffect, useState } from "react";

export default function App() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      // 打印出某次渲染组件后，本次传入的n的值
      console.log(n); // 这里的n，指向当前函数App()调用时的n
    }, 5000);
  }, [n]);
  return (
    <div>
      <h1>{n}</h1>
      <button
        onClick={() => {
          setN(n + 1);
        }}
      >
        n + 1
      </button>
    </div>
  );
}
