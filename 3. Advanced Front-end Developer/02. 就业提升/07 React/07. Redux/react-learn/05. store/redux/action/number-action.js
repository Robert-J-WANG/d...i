import * as actionTypes from "./action-type";

export const getIncreaseAction = () => ({
  type: actionTypes.INCREMENT,
});

export const getDecreaseAction = () => ({
  type: actionTypes.DECREMENT,
});

export const getSetAction = (newNumber) => ({
  type: actionTypes.SET,
  payload: newNumber,
});
