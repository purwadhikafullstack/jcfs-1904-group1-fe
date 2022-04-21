const init = {
  id: 0,
  username: "",
  isAdmin: 0,
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
      };

    case "LOGOUT_SUCCESS":
      return init;

    default:
      return state;
  }
};

export default authReducer;
