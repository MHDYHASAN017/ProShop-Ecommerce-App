import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import { getSingleUserById, updateUser } from "../Redux/actions/AdminActions";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

const SingleUserEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminReducer = useSelector((state) => state.adminReducer);
  const productReducer = useSelector((state) => state.productReducers);
  const { loading, singleUser } = adminReducer;
  const { message } = productReducer;

  useEffect(() => {
    dispatch(getSingleUserById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (message !== "") {
      navigate("/admin/user_list", {
        replace: true,
      });
    }
    console.log("runn");
  }, [message]);

  console.log(productReducer);

  const handleSubmitForm = (data) => {
    dispatch(updateUser(params.id, data));
  };

  if (loading === true || singleUser === null || singleUser === undefined) {
    return <Loader />;
  }

  return (
    <Layout center form_layout>
      <div className="row">
        <div className="text-3xl">SingleUserEdit</div>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-group">
            <h4>{errors.name && <span>Please Enter A Name</span>}</h4>
            <input
              className="form-control"
              type="text"
              placeholder="enter a  name"
              {...register("name", {
                required: true,
              })}
              defaultValue={singleUser.name}
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
              defaultValue={singleUser.email}
            />
          </div>
          <div className="form-group">
            <select
              className="form-group mt-3"
              {...register("isAdmin", {
                required: true,
              })}
              defaultValue={singleUser.isAdmin}
            >
              <option value="user">User</option>
              <option value="adminUser">Admin</option>
            </select>
          </div>
          <button className="btn btn-dark col-12 mt-3">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default SingleUserEdit;
