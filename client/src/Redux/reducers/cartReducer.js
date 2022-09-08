const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  if (action.type === "addToCart") {
    const item = action.payload;

    const existItem = state.cartItems.find((x) => x.product === item.product);

    if (existItem) {
      const updateCart = state.cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
      return {
        ...state,
        cartItems: updateCart,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
  } else if (action.type === "removeFromCart") {
    return({
      ...state , 
      cartItems : state.cartItems.filter(x => x.product !== action.payload)
    })
  }
  else if(action.type === "clearCart"){
    return({
      ...state , 
      cartItems : [] 
    })
  }
  return state;
};

export default cartReducer;
