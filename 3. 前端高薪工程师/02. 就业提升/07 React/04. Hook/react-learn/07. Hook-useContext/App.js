import React, { createContext, useContext } from "react";

/* ------------------ 1.传统使用context的方法 ------------------ */
// // 创建一个上下文对象ctx
// const ctx = createContext();

// /**
//  * 提供context的一个子组件
//  * @returns
//  */
// export default function App() {
//   return (
//     // 提供上下文
//     <ctx.Provider value={"hello world"}>
//       <div>
//         <h1>我是context的提供者</h1>
//         <hr />
//         <Test />
//       </div>
//     </ctx.Provider>
//   );
// }

// /**
//  * 使用上下文的一个组件
//  * @returns
//  */
// function Test() {
//   return (
// 使用context
//     <ctx.Consumer>
//       {(value) => (
//         <div>
//           <h1>我是context的消费（使用）者</h1>
//           <h2>context的值是：{value}</h2>
//         </div>
//       )}
//     </ctx.Consumer>
//   );
// }

/* ----------------- 2.使用context hook的方法 ---------------- */

// 创建一个上下文对象ctx
const ctx = createContext();

/**
 * 提供context的一个子组件
 * @returns
 */
export default function App() {
  return (
    // 提供上下文
    <ctx.Provider value={"hello world"}>
      <div>
        <h1>我是context的提供者</h1>
        <hr />
        <Test />
      </div>
    </ctx.Provider>
  );
}

/**
 * 使用上下文的一个组件
 * @returns
 */
function Test() {
  // 直接使用context hook, 获取context
  const value = useContext(ctx);
  return (
    <div>
      <h1>我是context的消费（使用）者</h1>
      <h2>context的值是：{value}</h2>
    </div>
  );
}
