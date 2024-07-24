import { bindActionCreators } from "redux";
import * as loginUserActions from "./action/loginUserAction";
import { reducer } from "./reducer/index";
import createStore from "../redux/index";

/* ------- 1. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(reducer); // 不设置初始状态，默认值为undefined
console.log(store);
// 注册一个监听器
const unSubscribe = store.subscribe(() => {
  console.log(`这是一个监听器!`);
});
// 可以注册多个监听器
const newUnSubscribe = store.subscribe(() => {
  console.log(`这是一个新的监听器!`);
});
// 取消监听器
unSubscribe();
/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */

/* ------------------- 2.1 测试loginUser ------------------ */
const bindLoginUserActions = bindActionCreators(
  loginUserActions,
  store.dispatch
);
const { getSetLoginUser } = bindLoginUserActions;
getSetLoginUser({ username: "kate", password: "123456" });
console.log(store.getState());
