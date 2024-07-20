import { legacy_createStore as createStore } from "redux";

/* -------------------- 1. 自定义reducer ------------------- */
/**
 * reducer本身就是一个普通函数
 * @param {*} state 之前仓库store中的状态（数据）
 * @param {*} action 描述要做什么的对象
 * @returns 返回新的状态state
 */
function reducer(state, action) {
  // 本身要返回新的状态（数据）
  if (action.type === "increment") {
    return state + 1;
  } else if (action.type === "decrement") {
    return state - 1;
  } else return state;
}

/* ------- 2. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(reducer, 10); // store里的初始状态设为10
console.log(store.getState()); // 10 查看状态的初始值

/* --------------------- 3. 创建一个action对象 -------------------- */
const action = {
  type: "increment",
  payload: "",
};
/* ----------------- 4. 分发action给reducer ---------------- */
store.dispatch(action);

/* ------------------- 5.测试state是否更新成功 ------------------ */
console.log(store.getState()); // 11 更新成功
