// 创建新的reducer，用来合并所以的分支reducer
import { loginUserReducer } from "../reducer/loginUserReducer";
import { usersReducer } from "../reducer/usersReducer";
import { combineReducers } from "redux";

/* 
const initialState = {};
export const reducer = (state = initialState, action) => {
  const newState = {
    loginUser: loginUserReducer(state.loginUser, action),
    users: usersReducer(state.users, action),
  };
  return newState;
}; 
*/

/* ------------- 使用redux库提供的combineReducers ------------- */
export const reducer = combineReducers({
  loginUser: loginUserReducer,
  users: usersReducer,
});
