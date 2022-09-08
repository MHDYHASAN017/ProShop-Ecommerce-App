import axios from "axios";

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("userInfo");
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      const response = await axios.post(`/api/auth/login`, data, { config });
      dispatch({
        type: "loginSuccess",
        payload: response.data,
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));
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

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`/api/auth/register`, data, { config });
      // console.log(response.data);
      dispatch({
        type: "registerSuccess",
        payload: response.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
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
