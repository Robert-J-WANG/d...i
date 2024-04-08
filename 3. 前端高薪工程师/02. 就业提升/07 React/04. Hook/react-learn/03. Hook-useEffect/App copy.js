import React, { useEffect, useState } from "react";

/* ---------- 副作用需要：页面标题始终和状态n一致（操作组件外部的DOM元素） ---------- */
export default function App() {
  const [n, setN] = useState(0);
  // 副作用使用专门处理副作用的hook
  useEffect(() => {
    // 设置网页标题
    document.title = `计数器${n}`;
  });
  // 可以多次使用useEffect
  useEffect(() => {
    console.log("其他的副作用");
  });
  return (
    <div>
      <p>{n}</p>
      <button
        onClick={() => {
          setN(n + 1);
        }}
      >
        n++
      </button>
    </div>
  );
}
