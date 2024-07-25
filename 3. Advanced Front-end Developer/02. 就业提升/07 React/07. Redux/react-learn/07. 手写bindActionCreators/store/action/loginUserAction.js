export const SETLOGINUSER = "set-login-user";

export function getSetLoginUser(user) {
  return {
    type: SETLOGINUSER,
    payload: user,
  };
}
