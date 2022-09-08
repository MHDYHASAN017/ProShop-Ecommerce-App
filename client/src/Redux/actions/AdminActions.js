import axios from "axios";

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      dispatch({
        type : "placeOrderRequest"
      })

      const { data } = await axios.get(`/api/order/get_all_orders`, config);
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

export const getSingleUserById = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: "setLoading",
      });
      const { data } = await axios.get(`/api/auth/userById/${id}`, {
        config,
      });
      dispatch({
        type: "singleUserById",
        payload: data.user,
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

export const adminAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      //   console.log(getState().userReducers.user.token);
      const { user } = getState().userReducers;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      dispatch({
        type: "setLoading",
      });
      const { data } = await axios.get(`/api/auth/all_users`, config);
      dispatch({
        type: "adminAllUser",
        payload: data.users,
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

export const deleteUserFromAdmin = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(`/api/auth/delete_user/${id}`, {
        config,
      });
      dispatch({
        type: "adminAllUser",
        payload: data.users,
      });
      dispatch({
        type: "setMessage",
        payload: "user removed",
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

export const updateUser = (id, userData) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/auth/update/${id}`,
        userData,
        config
      );
      console.log(data);
      dispatch({
        type: "singleUserById",
        payload: data.singleUser,
      });
      dispatch({
        type: "setMessage",
        payload: "user updated!",
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

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/admin/create`, product, config);

      dispatch({
        type: "setMessage",
        payload: data.message,
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

export const editAdminProduct = (product, id) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // console.log(product);
      // console.log(id);

      const { data } = await axios.put(
        `/api/admin/edit/${id}`,
        product,
        config
      );

      // console.log(data);
      dispatch({
        type: "setMessage",
        payload: data.message,
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

export const deleteAdminProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().userReducers;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(id);
      const { data } = await axios.delete(`/api/admin/del/${id}`, config);

      // console.log(data);
      dispatch({
        type: "setMessage",
        payload: data.message,
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
