/**
 *
 * @param {function} reducer : reducer
 * @param {any} defaultState : 初始状态数据
 * @returns
 */
export default function (reducer, defaultState) {
  let curReducer = reducer;
  let curState = defaultState;

  const listeners = []; // 存储所有的监听器

  const dispatch = (action) => {
    // 判断action是不是一个plain object
    if (!_isPlainObject(action)) {
      throw new TypeError(`action is not a plain object!`);
    }
    // 判断action是否有他type属性
    if (action.type === undefined) {
      throw new TypeError(`action must have a type property!`);
    }
    curState = curReducer(curState, action);
    // 每次分发，循环监听器数组
    //运行所有的订阅者（监听器）
    for (const listener of listeners) {
      listener();
    }
  };

  const getState = () => {
    return curState;
  };

  // 添加一个监听器（订阅）
  const subscribe = (listener) => {
    listeners.push(listener);
    let isRemoved = false; // 记录当前监听器是否移除掉了
    return () => {
      // 从数组中移除当前添加器
      // 如果已经移除了
      if (isRemoved) {
        // 什么不做
        return;
      }
      // 否则，移除掉当前监听器
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
      isRemoved = true;
    };
  };
  // 创建仓库时，需要先分发一次默认初始的action
  dispatch({ type: `@@redux-INIT${_getRandomString(7)}`, payload: undefined });

  return {
    dispatch,
    getState,
    subscribe,
  };
}

/**
 *  辅助函数，判断一个对象是不是平面对象
 * @param {*} obj
 * @returns
 */
function _isPlainObject(obj) {
  if (typeof obj !== "object") {
    throw new TypeError(`${obj} is not a object!`);
  }
  if (Object.getPrototypeOf(obj) !== Object.prototype) {
    throw new TypeError(`${obj} is not a plain object!`);
  }
  return true;
}

/**
 * 生成指定长度的随机字符串
 * @param {*} length
 * @returns
 */
function _getRandomString(length) {
  return Math.random().toString(36).substring(2, length).split("").join(".");
}
