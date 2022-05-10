const init = {
  id: 0,
  username: "",
  isAdmin: 0,
  token: "",
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.user.id,
        username: action.payload.user.username,
        isAdmin: action.payload.user.isAdmin,
        isVerified: action.payload.user.isVerified,
        token: action.payload.token,
      };

    case "LOGOUT_SUCCESS":
      return init;

    default:
      return state;
  }
};

export default authReducer;
