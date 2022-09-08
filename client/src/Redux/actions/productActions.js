import axios from "axios";

export const allProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: "loading",
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get("/api/products/all", { config });
      dispatch({
        type: "allProducts",
        payload: data.products,
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

export const getSingleProductById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "loading",
    });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`/api/product/${id}`, { config });
      dispatch({
        type: "getSingleProductById",
        payload: data.product,
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

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: "clearMessage",
    });
  };
};

