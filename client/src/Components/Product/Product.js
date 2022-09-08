import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../UI/Rating";

const Product = ({ product }) => {
  return (
    <div className="card my-2 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <div className="card-image">
          <img src={product.image} className="img-fluid" alt="product_image" />
        </div>
      </Link>
      <div className="card-body">
        <Link className="no-underline" to={`/product/${product._id}`}>
          <div className="card-title theme_heading_color font-bold">
            {product.name}
          </div>
        </Link>
        <div className="card-text">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            {/* {product.rating} from {product.numReviews} reviews */}
          </div>
        </div>
        <div className="card-text">${product.price}</div>
      </div>
    </div>
  );
};

export default Product;
