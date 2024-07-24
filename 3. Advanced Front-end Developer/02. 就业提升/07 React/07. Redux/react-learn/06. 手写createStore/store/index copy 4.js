import { legacy_createStore as createStore, bindActionCreators } from "redux";
import * as usersActions from "./action/usersAction";
import { usersReducer } from "./reducer/usersReducer";
import { v4 as uuid } from "uuid";

/* ------- 1. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(usersReducer); // 不设置初始状态，默认值为undefined
console.log(store.getState()); // undefined 查看状态的初始值

/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */
const bindLUsersActions = bindActionCreators(usersActions, store.dispatch);
const { getAddUser, getDeleteUser, getUpdateUser } = bindLUsersActions;
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
