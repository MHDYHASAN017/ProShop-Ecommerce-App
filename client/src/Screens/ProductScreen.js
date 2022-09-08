import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSingleProductById } from "../Redux/actions/productActions";
import Rating from "../UI/Rating";
import { useDispatch } from "react-redux";

const ProductScreen = ({ match }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productReducers = useSelector((state) => state.productReducers);
  const navigate = useNavigate();
  const { product, loading } = productReducers;

  useEffect(() => {
    dispatch(getSingleProductById(params.id));
  }, [dispatch, params.id]);

  if (product === null || loading === true) {
    return <h3>Loading</h3>;
  }
  if (product === undefined) {
    return <h3>404 Error , Product Not Found!</h3>;
  }

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`, {
      replace: true,
    });
  };

  return (
    <div className="container">
      <div className="row my-3">
        <Link to="/" className="col-2 btn btn-success inline-block capitalize">
          go back
        </Link>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="image-fluid" alt="" />
        </div>
        <div className="col-md-3">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="theme_heading_color font-bold">{product.name}</div>
            </li>
            <li className="list-group-item">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </li>
            <li className="list-group-item">Price: ${product.price}</li>
            <li className="list-group-item">
              <div className="theme_text_color">
                Description: {product.description}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="card">
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Price : </div>
                  <div className="col">${product.price}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Status : </div>
                  <div className="col">
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Qty</div>
                  <div className="col">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <button
                  onClick={addToCartHandler}
                  className="btn btn-dark col-12"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
