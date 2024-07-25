// import { bindActionCreators } from "redux";
import * as loginUserActions from "./action/loginUserAction";
import * as usersActions from "./action/usersAction";
import { reducer } from "./reducer/index";
import createStore from "../redux/index";
import bindActionCreators from "../redux/bindActionCreators";

/* ------- 1. 使用createStore方法创建store ------ */
const store = createStore(reducer); // 不设置初始状态，默认值为undefined

/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */

/* ------------------- 2.1 测试loginUser ------------------ */
const bindLoginUserActions = bindActionCreators(
  loginUserActions,
  store.dispatch
);
console.log(bindLoginUserActions);
const { getSetLoginUser } = bindLoginUserActions;
getSetLoginUser({ username: "kate", password: "123456" });
console.log(store.getState());

/* --------------------- 2.2 测试user --------------------- */
const bindUsersActions = bindActionCreators(usersActions, store.dispatch);
const { getAddUser } = bindUsersActions;
getAddUser({ username: "James", password: "000000" });
console.log(store.getState());
