export const ADDUSER = "add-user";
export const DELETEUSER = "delete-user";
export const UPDATEUSER = "update-user";

export const getAddUser = (user) => ({
  type: ADDUSER,
  payload: user,
});

export const getDeleteUser = (id) => ({
  type: DELETEUSER,
  payload: id,
});

export const getUpdateUser = (id, newUserData) => ({
  type: UPDATEUSER,
  payload: { ...newUserData, id },
});
