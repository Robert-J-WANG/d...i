import React, { useEffect, useRef, useState } from "react";
/* --------------------- 1.传统的定时器组件 --------------------- */
// let timer;
// export default function Timer() {
//   const [n, setN] = useState(10);
//   useEffect(() => {
//     if (n === 0) return;
//     timer = setTimeout(() => {
//       setN(n - 1);
//     }, 1000);
//     console.log(timer);
//     return () => clearTimeout(timer);
//   }, [n]);
//   return (
//     <div>
//       <h1>num:{n}</h1>
//     </div>
//   );
// }

/* ----------------- 2. 使用useRef固定定时器的id ---------------- */
// export default function Timer() {
//   const [n, setN] = useState(10);
//   // 使用useRef()固定一个对象
//   const timerRef = useRef();
//   useEffect(() => {
//     if (n === 0) return;
//     // 使用固定对象的current值作为timer id
//     timerRef.current = setTimeout(() => {
//       setN(n - 1);
//     }, 1000);
//     console.log(timerRef.current);
//     return () => clearTimeout(timerRef.current);
//   }, [n]);
//   return (
//     <div>
//       <h1>num:{n}</h1>
//     </div>
//   );
// }

/* ------------- 3. 也可以使用useRef来固定其他数据，如状态n ------------- */

export default function Timer() {
  const [n, setN] = useState(10);
  // 使用useRef()固定一个对象
  const nRef = useRef(n);
  useEffect(() => {
    let timer = setInterval(() => {
      if (nRef.current === 0) return;
      nRef.current--;
      setN(nRef.current);
    }, 1000);
    console.log(timer);
    return () => clearInterval(timer);
  }, [n]);
  return (
    <div>
      <h1>num:{n}</h1>
    </div>
  );
}
