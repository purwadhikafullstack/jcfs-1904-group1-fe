export const loginAction = (loginData) => {
  localStorage.setItem("userData", JSON.stringify(loginData));
  console.log(loginData);
  return {
    type: "LOGIN_SUCCESS",
    payload: loginData,
  };
};

export const keepLoginAction = (userData) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userData,
  };
};

export const logoutAction = () => {
  localStorage.removeItem("userData");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
