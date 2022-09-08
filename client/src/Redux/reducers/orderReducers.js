const initialState = {
  loading: false,
  success: false,
  error: false,
  orders: [],
  singleOrder: null,
};

const orderReducers = (state = initialState, action) => {
  if (action.type === "placeOrderRequest") {
    return {
      ...state,
      loading: true,
      orders: [],
      singleOrder: null,
    };
  } else if (action.type === "placeOrderSuccess") {
    return {
      ...state,
      success: true,
      loading: false,
    };
  } else if (action.type === "orderSuccess") {
    return {
      ...state,
      orders: action.payload,
      singleOrder: null,
      loading: false,
    };
  } else if (action.type === "getSingleOrderByOrderId") {
    return {
      ...state,
      orders: [],
      singleOrder: action.payload,
      loading: false,
    };
  }
  return state;
};

export default orderReducers;
