import { legacy_createStore as createStore, bindActionCreators } from "redux";
import * as loginUserActions from "./action/loginUserAction";
import { loginUserReducer } from "./reducer/loginUserReducer";
import { v4 as uuid } from "uuid";

/* ------- 1. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(loginUserReducer); // 不设置初始状态，默认值为undefined
console.log(store.getState()); // undefined 查看状态的初始值

/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */
const bindLoginUserActions = bindActionCreators(
  loginUserActions,
  store.dispatch
);
bindLoginUserActions.getSetLoginUser({ id: uuid(), username: "jack" });
console.log(store.getState());
