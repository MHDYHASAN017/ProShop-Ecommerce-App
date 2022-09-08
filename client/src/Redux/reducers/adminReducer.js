const initialState = {
  loading: false,
  users: [],
  singleUser: null,
};

const adminReducer = (state = initialState, action) => {
  if (action.type === "setLoading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "adminAllUser") {
    return {
      ...state,
      users: action.payload,
      singleUser: null,
      loading: false,
    };
  } else if (action.type === "singleUserById") {
    return {
      ...state,
      users: [],
      singleUser: action.payload,
      loading: false,
    };
  } else if (action.type === "adminAllUserFailed") {
    return {
      ...state,
      users: [],
      singleUser: null,
      loading: false,
    };
  }
  return state;
};

export default adminReducer;
