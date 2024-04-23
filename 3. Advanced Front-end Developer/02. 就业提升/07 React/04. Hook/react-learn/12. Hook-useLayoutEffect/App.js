import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

/* ------------------- 1. 使用useEffect ------------------- */
// export default function App() {
//   const [n, setN] = useState(0);
//   const pRef = useRef();
//   useEffect(() => {
//     pRef.current.innerText = Math.random();
//   }, [n]);
//   return (
//     <div>
//       <p ref={pRef}>{n}</p>
//       <button onClick={() => setN(n + 1)}>点击啊</button>
//     </div>
//   );
// }

/* ---------------- 2. 使用useLayoutEffect ---------------- */
export default function App() {
  const [n, setN] = useState(0);
  const pRef = useRef();
  useLayoutEffect(() => {
    pRef.current.innerText = Math.random();
  }, [n]);
  return (
    <div>
      <p ref={pRef}>{n}</p>
      <button onClick={() => setN(n + 1)}>点击啊</button>
    </div>
  );
}
