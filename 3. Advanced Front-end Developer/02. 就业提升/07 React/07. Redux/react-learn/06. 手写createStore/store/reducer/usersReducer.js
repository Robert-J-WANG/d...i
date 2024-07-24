import { ADDUSER, DELETEUSER, UPDATEUSER } from "../action/usersAction";

const initialState = [
  { id: 1, username: "Rose", age: 18 },
  { id: 2, username: "Peter" },
  { id: 3, username: "Eva", address: "11 cleghorn Ave" },
];

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDUSER:
      return [...state, payload];
    case DELETEUSER:
      return state.filter((u) => u.id !== payload);
    case UPDATEUSER:
      return state.map((u) => (u.id === payload.id ? { ...u, ...payload } : u));
    default:
      return state;
  }
};
