export default function (actionCreators, dispatch) {
  console.log(actionCreators);
  // 当参数是一个actionCreator函数时，返回自动分发action的函数
  if (typeof actionCreators === "function") {
    return _getAutoDispatchActionCreator(actionCreators, dispatch);
  }
  // 当参数是一个actionCreator函数的对象时，返回自动分发action的同名对象
  else if (typeof actionCreators === "object") {
    const result = {};
    for (const key in actionCreators) {
      if (actionCreators.hasOwnProperty(key)) {
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === "function") {
          result[key] = _getAutoDispatchActionCreator(actionCreator, dispatch);
        }
      }
    }
    return result;
  }
  // 当参数不是对象时，报错
  else {
    throw new TypeError("actionCreators must be a function or object");
  }
}

function _getAutoDispatchActionCreator(actionCreator, dispatch) {
  return function (...args) {
    const action = actionCreator(...args);
    dispatch(action);
  };
}
