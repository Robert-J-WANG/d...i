import * as actionTypes from "../action/action-type";

export function reducer(state, action) {
  // 本身要返回新的状态（数据）
  if (action.type === actionTypes.INCREMENT) {
    return state + 1;
  } else if (action.type === actionTypes.DECREMENT) {
    return state - 1;
  } else if (action.type === actionTypes.SET) {
    return action.payload;
  } else return state;
}
