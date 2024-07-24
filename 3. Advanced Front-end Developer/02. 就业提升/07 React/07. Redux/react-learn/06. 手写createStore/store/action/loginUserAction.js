export const SETLOGINUSER = "set-login-user";

export const getSetLoginUser = (user) => ({
  type: SETLOGINUSER,
  payload: user,
});
