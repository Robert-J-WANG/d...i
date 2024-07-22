import { legacy_createStore as createStore } from "redux";
import * as NumberActions from "./action/action-type";

/* -------------------- 1. 自定义reducer ------------------- */
/**
 * reducer本身就是一个普通函数
 * @param {*} state 之前仓库store中的状态（数据）
 * @param {*} action 描述要做什么的对象
 * @returns 返回新的状态state
 */
function reducer(state, action) {
  // 本身要返回新的状态（数据）
  if (action.type === NumberActions.INCREMENT) {
    return state + 1;
  } else if (action.type === NumberActions.DECREMENT) {
    return state - 1;
  } else return state;
}

/* ------- 2. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(reducer, 10); // store里的初始状态设为10
console.log(store.getState()); // 10 查看状态的初始值

/* --------------------- 3. 创建一个action对象 -------------------- */
// 3.1 action是一个plain-object（平面对象）,如果通过类创建的对象，会报错
// class Action {
//   constructor(type) {
//     this.type = type;
//   }
// }
// const action = new Action("increment");

// 3.2 action中必须有type属性，该属性用于描述操作的类型. 但是，没有对type的类型做出要求
// const action = {
//   type: 1,
//   payload: "",
// };

const action = {
  type: "increment",
  payload: "",
};
/* ----------------- 4. 分发action给reducer ---------------- */
store.dispatch(action);

/* ------------------- 5.测试state是否更新成功 ------------------ */
console.log(store.getState()); // 11 更新成功
