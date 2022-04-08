export const loginAction = (loginData) => {
  localStorage.setItem("userData", JSON.stringify(loginData));

  return {
    type: "LOGIN_SUCCESS",
    payload: loginData,
  };
};

export const keepLoginAction = ({ id, username }) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { id, username },
  };
};

export const logoutAction = () => {
  localStorage.removeItem("userData");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
