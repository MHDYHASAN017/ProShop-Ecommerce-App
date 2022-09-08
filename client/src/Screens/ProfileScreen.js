import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../UI/Layout";
import { Navigate , Link } from "react-router-dom";
import { logout } from "../Redux/actions/userAction";

const ProfileScreen = () => {
  const userReducers = useSelector((state) => state.userReducers);
  const dispatch = useDispatch();
  const { user } = userReducers;

  const logoutHandler = (e) => {
    dispatch(logout());
  };

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout form_layout>
      <div className="row">
        <div className="text-4xl">Your Profile Info</div>
      </div>
      <div className="row">
        <div className="py-3 text-center text-white theme_background_color space-y-3 rounded-lg">
          <div className="text-3xl">{user.name}</div>
          <div className="text-2xl">{user.email}</div>
          <div className="">
            <Link to='/login' onClick={logoutHandler}  className="btn btn-dark col-12">LOGOUT</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
