import * as actionTypes from "../action/action-type";

// 在reducer中初始化状态：state = 100
export function reducer(state = 100, action) {
  if (action.type === actionTypes.INCREMENT) {
    return state + 1;
  } else if (action.type === actionTypes.DECREMENT) {
    return state - 1;
  } else if (action.type === actionTypes.SET) {
    return action.payload;
  } else return state;
}
