import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../UI/Layout";
import { addToCart, removeFromCart } from "../Redux/actions/cartAction";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import Checkout from "../Components/Checkout/Checkout";

const CartScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer);
  const userReducers = useSelector((state) => state.userReducers);
  const productReducer = useSelector((state) => state.productReducers);
  const { cartItems } = cart;
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

  const { user } = userReducers;
  const { message } = productReducer;

  console.log(productReducer);

  useEffect(() => {
    if (message === "order placed successfully") {
      navigate("/", {
        replace: true,
      });
      dispatch({
        type: "clearCart",
      });
      localStorage.removeItem("cartItems");
    } else {
      dispatch(addToCart(params.id, qty));
    }
  }, [message, dispatch, navigate, params.id, qty]);

  const subTotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(0);

  return (
    <Layout>
      <div className="row">
        <div className="text-5xl theme_heading_color text-center">
          Your Cart
        </div>
      </div>
      <div className="row my-3">
        <div className="text-center">
          {cartItems.length === 0 ? (
            <div>
              <div className="text-4xl">Your Cart Is Empty</div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-8">
                {cartItems.map((item) => (
                  <div key={item.product} className="list-group">
                    <div className="list-group-item my-2">
                      <div className="row">
                        <div className="col-md-2">
                          <img
                            src={item.image}
                            className="img-fluid rounded-lg"
                            alt="item_image"
                          />
                        </div>
                        <div className="col-md-3">
                          <Link
                            className="theme_heading_color no-underline"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-md-2">{item.price}</div>
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <Link
                            to="/cart"
                            onClick={() =>
                              dispatch(removeFromCart(item.product))
                            }
                            className="btn btn-dark"
                          >
                            <BsFillTrashFill />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="text-3xl theme_heading_color">
                        Sub Total :{" "}
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                        items
                      </div>
                      <div className="text-2xl theme_heading_color my-3">
                        Total Price : ${subTotal}
                      </div>
                    </div>
                    {user !== null ? (
                      <Link to="/cart" className="list-group-item">
                        <Checkout amount={Number(subTotal)} />
                      </Link>
                    ) : (
                      <div className="list-group-item">
                        <Link to="/login" className="btn btn-dark col-12 ">
                          Please Login to checkout
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartScreen;
