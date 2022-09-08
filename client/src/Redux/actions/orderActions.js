import axios from "axios";

export const placeOrder = (token, subTotal) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { user } = getState().userReducers;
      const { cartItems } = getState().cartReducer;

      const cartItem = [];

      for (let i = 0; i < cartItems.length; i++) {
        var item = {
          name: cartItems[i].name,
          qty: cartItems[i].qty,
          _id: cartItems[i]._id,
          price: cartItems[i].price,
        };
        cartItem.push(item);
      }

      //   console.log(user);

      dispatch({
        type: "placeOrderRequest",
      });

      const { data } = await axios.post(
        `/api/order/placeorder`,
        { token, subTotal, user, cartItem },
        { config }
      );
      // console.log(data);
      dispatch({
        type: "setMessage",
        payload: data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "setMessage",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getOrdersById = () => {
  return async (dispatch, getState) => {
    const { user } = getState().userReducers;

    let token;

    if (user != null) {
      token = user.token;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: "placeOrderRequest",
    });
    try {
      const { data } = await axios.get(`/api/order/ordersById`, config);
      dispatch({
        type: "orderSuccess",
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getSingleOrderByOrderId = (order_id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      dispatch({
        type: "placeOrderRequest",
      });
      const { data } = await axios.get(`/api/order/single_order/${order_id}`, {
        config,
      });
      dispatch({
        type: "getSingleOrderByOrderId",
        payload: data.singleOrder,
      });
    } catch (error) {
      dispatch({
        type: "setMessage",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
