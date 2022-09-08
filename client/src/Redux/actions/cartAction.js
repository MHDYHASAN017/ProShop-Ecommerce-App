import axios from "axios";

export const addToCart = (product_id, qty) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/product/${product_id}` , {config});

    dispatch({
      type: "addToCart",
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty: qty,
      },
    });
    // console.log(getState().cart.cartItems);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };
};

export const removeFromCart = (product_id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "removeFromCart",
      payload: product_id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };
};
