export const loginAction = (loginData) => {
  localStorage.setItem("userData", JSON.stringify(loginData));

  return {
    type: "LOGIN_SUCCESS",
    payload: loginData,
  };
};

export const keepLoginAction = ({ id, username, isAdmin }) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { id, username, isAdmin },
  };
};

export const logoutAction = () => {
  localStorage.removeItem("userData");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
