import React from "react";
import Layout from "../UI/Layout";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

import { loginUser } from "../Redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducers);
  const { user } = userReducer;

  const handleSubmitForm = async (data) => {
    dispatch(loginUser(data));
  };

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout center form_layout>
      <div className="row">
        <div className="text-center">
          <div className="text-4xl">Login</div>
        </div>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-group">
            <h4>{errors.email && <span>please enter a valid email</span>}</h4>
            <input
              type="email"
              className="form-control"
              placeholder="enter email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
          </div>
          <div className="form-group">
            <h4>
              {errors.password && (
                <span>password length more then 5 characture</span>
              )}
            </h4>
            <input
              className="form-control"
              type="text"
              placeholder="enter password"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
            />
          </div>
          <button className="btn btn-dark col-12 mt-3">Login</button>
        </form>
        <div className="mt-5">
          <Link to="/register" className="no-underline">
            <div className={`bg-orange-500 w-full py-2 rounded-md text-white`}>
              Have No Account ? Register Here!
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
