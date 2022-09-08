import React from "react";
import Layout from "../../UI/Layout";
import { useForm } from "react-hook-form";
import { createProduct } from "../../Redux/actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducers);

  const { message } = productReducer;

  // console.log(productReducer);

  useEffect(() => {
    if (message !== "") {
      navigate("/admin/product_list", {
        replace: true,
      });
    }
  }, [message]);

  const handleSubmitForm = (data) => {
    // console.log(data);
    dispatch(createProduct(data));
  };

  return (
    <Layout form_layout>
      <div className="row">
        <div className="text-3xl">AdminCreateProduct</div>
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
            <h4>{errors.price && <span>please product price</span>}</h4>
            <input
              type="number"
              className="form-control"
              placeholder="enter price"
              {...register("price", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <h4>{errors.brand && <span>please product brand name</span>}</h4>
            <input
              type="text"
              className="form-control"
              placeholder="enter brand"
              {...register("brand", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <h4>{errors.category && <span>please product category</span>}</h4>
            <input
              type="text"
              className="form-control"
              placeholder="enter category"
              {...register("category", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <h4>
              {errors.countInStock && (
                <span>please product count In Stock</span>
              )}
            </h4>
            <input
              type="number"
              className="form-control"
              placeholder="enter countInStock"
              {...register("countInStock", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <h4>
              {errors.numReviews && <span>please product num of reviews</span>}
            </h4>
            <input
              type="number"
              className="form-control"
              placeholder="enter numReviews"
              {...register("numReviews", {
                required: true,
              })}
            />
          </div>
          <div className="form-group">
            <h4>
              {errors.description && <span>please product description</span>}
            </h4>
            <textarea
              type="text"
              className="form-control"
              placeholder="enter description"
              {...register("description", {
                required: true,
              })}
            />
          </div>

          <button className="btn btn-dark col-12 mt-4">Add Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default AdminCreateProduct;
