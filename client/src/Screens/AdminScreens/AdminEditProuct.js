import React from "react";
import Layout from "../../UI/Layout";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProductById } from "../../Redux/actions/productActions";
import { editAdminProduct } from "../../Redux/actions/AdminActions";
import Loader from "../../UI/Loader";
import axios from "axios";
import { useState } from "react";

const AdminEditProuct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const [image , setImage] = useState("") 
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const productReducer = useSelector((state) => state.productReducers);
  const { product, loading, message } = productReducer;
  console.log(productReducer);

  useEffect(() => {
    dispatch(getSingleProductById(params.id));
  }, []);

  useEffect(() => {
    if (message !== "") {
      navigate("/admin/product_list", {
        replace: true,
      });
    }
  }, [message]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitForm = (data) => {
    // console.log(data);
    data.image = image 
    // console.log(data);

    dispatch(editAdminProduct(data, params.id));
  };

  if (loading === true || product === null) {
    return <Loader />;
  }

  return (
    <Layout form_layout>
      <div className="row my-3 text-4xl">AdminEditProuct</div>
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
              defaultValue={product.name}
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
              defaultValue={product.price}
            />
          </div>
          <div className="form-group">
            <h4>{errors.image && <span>please product image</span>}</h4>
            <input
              type="file"
              className="form-control"
              placeholder="enter image"
              {...register("image", {
                required: false,
              })}
              onChange={uploadFileHandler}
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
              defaultValue={product.brand}
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
              defaultValue={product.category}
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
              defaultValue={product.countInStock}
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
              defaultValue={product.numReviews}
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
              defaultValue={product.description}
            />
          </div>

          <button className="btn btn-dark col-12 mt-4">Update Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default AdminEditProuct;
