// 使用官方的 useReducer hook
import React, { useReducer } from "react";
// 使用自定义的 useReducer hook
// import useReducer from "./hooks/useReducer";

// import MovieContainer from "./components/MovieContainer";
// import Test from "./components/Test";

/* ---------------------- 自定义hook部分 --------------------- */
// export default function App() {
//   // 控制Test组件挂载/销毁
//   const [visible, setVisible] = useState(true);
//   return (
//     <div>
//       {/* 测试自定义useMovies hook */}
//       {/* <MovieContainer /> */}
//       {/* 测试自定义开关定时器hook */}
//       {visible && <Test />}
//       <button onClick={() => setVisible(!visible)}>显示/隐藏</button>
//     </div>
//   );
// }

/**
 * 定义一个方法， 用来更新数据
 * @param {any} state 当前数据仓库中的数据
 * @param {object} action {type: string 动作的类型，
 * payload:any 动作发生后的附加信息}
 * @returns 数据仓库变化之后的数据
 */
function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return state + 1;
    case "decrease":
      if (state === 0) {
        return 0;
      }
      return state - 1;
    default:
      return state;
  }
}

export default function App({ n = 100 }) {
  // useReducer 使用第三个参数
  const [state, dispatch] = useReducer(reducer, n, (args) => {
    return args * 2; // 此时state的初始值是200
  });
  return (
    <div>
      <h1>{state}</h1>
      {/* 使用dispatch函数，触发reducer */}
      <button onClick={() => dispatch({ type: "increase" })}>+n</button>
      <button onClick={() => dispatch({ type: "decrease" })}>-n</button>
    </div>
  );
}
