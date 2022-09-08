import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/Header";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/ProductScreen";
import { clearMessage } from "./Redux/actions/productActions";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import MyOrderScreens from "./Screens/MyOrderScreens";
import SingleOrderDetails from "./Screens/SingleOrderDetails";
import UserListScreen from "./Screens/AdminScreens/UserListScreen";
import SingleUserScreen from "./Screens/SingleUserScreen";
import SingleUserEdit from "./Screens/SingleUserEdit";
import AdminProductScreen from "./Screens/AdminScreens/AdminProductScreen";
import AdminCreateProduct from "./Screens/AdminScreens/AdminCreateProduct";
import AdminEditProuct from "./Screens/AdminScreens/AdminEditProuct";
import OrdersListScreen from "./Screens/AdminScreens/OrdersListScreen";

function App() {
  const productReducers = useSelector((state) => state.productReducers);
  const dispatch = useDispatch();
  const { message } = productReducers;

  useEffect(() => {
    if (message !== "") {
      toast(message);
    }
    dispatch(clearMessage());
  }, [message, dispatch]);

  // console.log(cartItems);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/my_orders" element={<MyOrderScreens />} />
        <Route path="/single_order/:id" element={<SingleOrderDetails />} />
        <Route path="/admin/user_list" element={<UserListScreen />} />
        <Route path="/admin/product_list" element={<AdminProductScreen />} />
        <Route path="/admin/create_product" element={<AdminCreateProduct />} />
        <Route path="/admin/product/:id/edit" element={<AdminEditProuct />} />
        <Route path="/admin/orders_list" element={<OrdersListScreen />} />
        <Route path="/single_user/:id" element={<SingleUserScreen />} />
        <Route path="/single_user/:id/edit" element={<SingleUserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
