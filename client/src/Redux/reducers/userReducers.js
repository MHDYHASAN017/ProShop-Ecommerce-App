const initialState = {
  loading: null,
  user: null,
  isAuthenticated: false,
};

const userReducers = (state = initialState, action) => {
  if (action.type === "authLoading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "loginSuccess") {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
      loading: false,
    };
  } else if (action.type === "registerSuccess") {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
      loading: false,
    };
  } else if (action.type === "logout") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      loading: false,
    };
  }

  return state;
};

export default userReducers;
