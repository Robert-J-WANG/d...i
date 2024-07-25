import * as actionTypes from "../action/action-type";

// 在reducer中初始化状态：state = 100
export function reducer(state = 100, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state + 1;
    case actionTypes.DECREMENT:
      return state - 1;
    case actionTypes.SET:
      return action.payload;
    default:
      return state;
  }
}
