const initialState = {
  loading: null,
  products: [],
  product: null,
  message: "",
};

const productReducers = (state = initialState, action) => {
  if (action.type === "setMessage") {
    return {
      ...state,
      message: action.payload,
    };
  } else if (action.type === "clearMessage") {
    return {
      ...state,
      message: "",
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: true,
      products: [],
      product: null,
    };
  } else if (action.type === "allProducts") {
    return {
      ...state,
      loading: false,
      products: action.payload,
    };
  } else if (action.type === "getSingleProductById") {
    return {
      ...state,
      product: action.payload,
      loading: false,
    };
  } else if (action.type === "productListFail") {
    // console.log(action.payload);
    return {
      ...state,
      loading: false,
      products: [],
      product: null,
      message: action.payload,
    };
  }

  return state;
};

export default productReducers;
