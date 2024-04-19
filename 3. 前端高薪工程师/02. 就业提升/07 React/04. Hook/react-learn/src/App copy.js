import React, { createRef, useRef, useState } from "react";

/* --------------- 1. 使用createRef()创建ref对象 -------------- */
// // 创建空数组，存储ref对象
// window.arr = [];
// function Test() {
//   console.log("Test render");
//   const [txt, setTxt] = useState("");
//   const [n, setN] = useState(0);
//   const inputRef = createRef();

//   // 将inputRef对象存储到window.arr里
//   window.arr.push(inputRef);
//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={() => setTxt(inputRef.current.value)}>
//         得到input的值
//       </button>
//       <p>
//         input的值时：{txt}, N的值是：{n}
//       </p>
//       {/* 组件重绘 */}
//       <button onClick={() => setN(Math.random())}>获取n的值</button>
//     </div>
//   );
// }

/* ------------------ 2.  使用useRef hook ----------------- */

// 创建空数组，存储ref对象
window.arr = [];
function Test() {
  console.log("Test render");
  const [txt, setTxt] = useState("");
  const [n, setN] = useState(0);
  const inputRef = useRef();

  // 将inputRef对象存储到window.arr里
  window.arr.push(inputRef);
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => setTxt(inputRef.current.value)}>
        得到input的值
      </button>
      <p>
        input的值时：{txt}, N的值是：{n}
      </p>
      {/* 组件重绘 */}
      <button onClick={() => setN(Math.random())}>获取n的值</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Test />
      <Test />
    </div>
  );
}
