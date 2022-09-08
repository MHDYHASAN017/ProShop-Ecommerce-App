import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import productReducers from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducer";
import userReducers from "./reducers/userReducers";
import orderReducers from "./reducers/orderReducers";
import adminReducer from "./reducers/adminReducer";

const rootReducer = combineReducers({
  productReducers: productReducers,
  cartReducer: cartReducer,
  userReducers: userReducers,
  orderReducers : orderReducers , 
  adminReducer : adminReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cartReducer: { cartItems: cartItemsFromLocalStorage },
  userReducers: { user: userFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
