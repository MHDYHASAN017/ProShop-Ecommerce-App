import React from "react";
import Layout from "../UI/Layout";
import Product from "../Components/Product/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../Redux/actions/productActions";
import Loader from "../UI/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducers);
  const { loading, products } = productReducer;

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  if (loading === null || loading === true) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
            <Product product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
