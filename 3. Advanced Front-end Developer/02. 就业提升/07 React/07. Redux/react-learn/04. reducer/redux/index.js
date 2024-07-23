import { legacy_createStore as createStore, bindActionCreators } from "redux";
import * as loginUserActions from "./action/loginUserAction";
import * as usersActions from "./action/usersAction";
import { reducer } from "./reducer/index";
import { v4 as uuid } from "uuid";

/* ------- 1. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(reducer); // 不设置初始状态，默认值为undefined
console.log(store.getState()); // undefined 查看状态的初始值

/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */

/* ------------------- 2.1 测试loginUser ------------------ */
const bindLoginUserActions = bindActionCreators(
  loginUserActions,
  store.dispatch
);
const { getSetLoginUser } = bindLoginUserActions;
getSetLoginUser({ username: "kate", password: "123456" });
console.log(store.getState());

/* --------------------- 2.2 测试users -------------------- */
const bindUsersActions = bindActionCreators(usersActions, store.dispatch);
const { getAddUser, getDeleteUser, getUpdateUser } = bindUsersActions;
getAddUser({
  id: uuid(),
  username: "jack",
  email: "jack@gmail.com",
});
console.log(store.getState());
getDeleteUser(1);
console.log(store.getState());
getUpdateUser(2, { username: "jack2", age: 19 });
console.log(store.getState());
