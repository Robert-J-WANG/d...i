import { useState } from "react";

/**
 * 自定义hook,用来触发reducer，更新状态数据
 * @param {any} initState 初始化状态值
 * @param {function} reducer 操作数据的reducer函数
 * @returns [更新后的状态，dispatch函数]
 */
export default function useReducer(reducer, initState) {
  const [state, setState] = useState(initState);

  /**
   * 触发reducer的函数
   * @param {*} action 操作数据的动作对象
   */
  function dispatch(action) {
    const newState = reducer(state, action);
    // 打印状态变化日志，便于调试
    console.log(`state change log : ${state}=>${newState}`);
    setState(newState);
  }

  return [state, dispatch];
}
