import React, { useCallback, useState } from "react";

class Test extends React.PureComponent {
  render() {
    console.log("Test render");
    return (
      <div>
        <p>{this.props.text}</p>
        <button onClick={() => this.props.onClick()}>Change Text</button>
      </div>
    );
  }
}
/* ----------------- 1. 重新设置状态--与初始值不一样时 ---------------- */
/* export default function App() {
  console.log("App render");
  const [txt, setTxt] = useState("hello world ---->" + 0);
  return (
    <div>
      <Test
        text={txt}
        onClick={() => setTxt("hello world ---->" + Math.random())}
      />
    </div>
  );
} */

/* ----------------- 2. 重新设置状态--与初始值相同时 ----------------- */
// export default function App() {
//   console.log("App render");
//   const [txt, setTxt] = useState("hello world ---->" + 0);
//   return (
//     <div>
//       <Test text={txt} onClick={() => setTxt("hello world ---->" + 0)} />
//     </div>
//   );
// }

/* -------------------- 3. 添加一个受控表单组件 ------------------- */
// export default function App() {
//   console.log("App render");
//   const [txt, setTxt] = useState("hello world ---->" + 0);
//   const [n, setN] = useState(0);
//   return (
//     <div>
//       <Test
//         text={txt}
//         // 函数的地址每次渲染都发生了变化
//         onClick={() => setTxt("hello world ---->" + 0)}
//       />
//       {/* 受控表单组件 */}
//       <input type="text" value={n} onChange={(e) => setN(e.target.value)} />
//     </div>
//   );
// }

/* ----------- 4. 使用useCallback() hook解决上面的问题 ----------- */

export default function App() {
  console.log("App render");
  const [txt, setTxt] = useState("hello world ---->" + 0);
  const [n, setN] = useState(0);

  const handleClick = useCallback(
    () => setTxt("hello world ---->" + Math.random()),
    [] // 依赖项为空，useCallback的返回值不变
  );
  return (
    <div>
      <Test
        text={txt}
        // 使用useCallback的返回值
        onClick={handleClick}
      />
      {/* 受控表单组件 */}
      <input type="text" value={n} onChange={(e) => setN(e.target.value)} />
    </div>
  );
}
