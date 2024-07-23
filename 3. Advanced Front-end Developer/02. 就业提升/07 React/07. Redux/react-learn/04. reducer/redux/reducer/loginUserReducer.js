import { SETLOGINUSER } from "../action/loginUserAction";

const initialState = {};
export const loginUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SETLOGINUSER:
      return payload;

    default:
      return state;
  }
};
