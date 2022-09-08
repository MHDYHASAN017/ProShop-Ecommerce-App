import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../UI/Layout";
import { allProducts } from "../../Redux/actions/productActions";
import Loader from "../../UI/Loader";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { deleteAdminProduct } from "../../Redux/actions/AdminActions";

const AdminProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducers);
  const productReducer = useSelector((state) => state.productReducers);

  const { user } = userReducer;
  const { products, loading , message  } = productReducer;
  // console.log(productReducer);

  useEffect(() => {
    if (user.isAdmin === true) {
      dispatch(allProducts());
    } else {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate, dispatch, message]);

  const deleteProductHandler = (id) => {
    dispatch(deleteAdminProduct(id))
  };


  if (loading === true) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="row">
        <div className="text-3xl">AdminProductScreen</div>
        <div className="col-sm-2 my-3">
          <Link
            to="/admin/create_product"
            className="theme_background_color no-underline py-1 px-2 rounded-lg capitalize text-white inline-block"
          >
            create product
          </Link>
        </div>
      </div>
      {products.map((product) => (
        <div key={product._id} className="row my-4 shadow-xl py-2">
          <div className="col-md-2">
            <img
              src={product.image}
              className="h-full w-full object-cover"
              alt="product_img"
            />
          </div>
          <div className="col-md-3 flex flex-col justify-between">
            <div>{product.name}</div>

            <div>count in stock : {product.countInStock}</div>
          </div>
          <div className="col-md-3 text-center flex flex-col justify-around">
            <div>price : ${product.price}</div>
            <div>
              <div>{product.brand}</div>
              <div>{product.category}</div>
            </div>
          </div>
          <div className="col-md-3 ms-auto flex flex-col justify-between items-end">
            <Link to={`/admin/product/${product._id}/edit`} className="cursor-pointer">
              <AiFillEdit />
            </Link>
            <div onClick={() => deleteProductHandler(product._id)} className="cursor-pointer">
              <BsTrash />
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default AdminProductScreen;
