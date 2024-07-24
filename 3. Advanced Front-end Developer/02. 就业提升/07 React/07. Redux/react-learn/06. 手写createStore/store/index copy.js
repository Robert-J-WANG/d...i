import { legacy_createStore as createStore, bindActionCreators } from "redux";
import * as numberActions from "./action/number-action";
import { reducer } from "./reducer/index";

/* ------- 1. 使用redux提供的数据仓库store（使用createStore方法） ------ */
const store = createStore(reducer, 10); // store里的初始状态设为10
console.log(store.getState()); // 10 查看状态的初始值

/* ----- 2.使用bindActionCreators函数创建增强版action，并自动完成分发 ---- */
const bindNumberActions = bindActionCreators(numberActions, store.dispatch);
bindNumberActions.getIncreaseAction();
console.log(store.getState()); // 11 更新成功
