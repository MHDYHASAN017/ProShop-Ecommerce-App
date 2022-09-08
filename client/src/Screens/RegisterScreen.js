import React from "react";
import Layout from "../UI/Layout";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../Redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const dispatch = useDispatch();
  const userReducers = useSelector((state) => state.userReducers);
  const { user } = userReducers;

  const handleSubmitForm = (data) => {
    dispatch(registerUser(data));
  };

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout center form_layout>
      <div className="row text-center">
        <div className="text-4xl">Register Here</div>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-group">
            <h4>{errors.name && <span>please enter your name</span>}</h4>
            <input
              type="text"
              className="form-control"
              placeholder="enter name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
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
          <button className="btn btn-info col-12 mt-3">register</button>
        </form>
        <div className="mt-5">
          <Link to="/login" className="no-underline">
            <div className={`bg-orange-500 w-full py-2 rounded-md text-white`}>
              Have A Account ? Login Here!
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterScreen;
