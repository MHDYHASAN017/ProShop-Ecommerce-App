import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../UI/Layout";
import { getOrdersById } from "../Redux/actions/orderActions";
import { Navigate , Link } from "react-router-dom";
import Loader from "../UI/Loader";

const MyOrderScreens = () => {
  const dispatch = useDispatch();
  const userReducers = useSelector((state) => state.userReducers);
  const orderReducer = useSelector((state) => state.orderReducers);
  const { user } = userReducers;
  const { orders, loading } = orderReducer;
  console.log(orderReducer);

  useEffect(() => {
    dispatch(getOrdersById());
  }, [dispatch]);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  if (loading === true) {
    return (
     <Loader/>
    );
  }

  return (
    <Layout>
      <div className="row text-center">
        <div className="text-4xl">MyOrderScreen</div>
      </div>
      {/* <> */}
        {orders.map((order) => (
          <div className="row my-2 py-2 border-2 mb-3 border-green-800" key={order._id}>
            <div className="col-md-3">
              <Link to ={`/single_order/${order._id}`} className="card p-1">
                <div>order id</div>
                <div>{order._id}</div>
              </Link>
            </div>
            <div className="col-md-2">
              <div className="card p-1">
                <div>Amount</div>
                <div>${order.orderAmount}</div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card p-1">
                <div>date</div>
                <div>{order.createdAt}</div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-1">
                <div>transection-id</div>
                <div>{order.transactionID}</div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card p-1">
                <div>status</div>
                <div>{order.isDelivered === true ? <>Deliverd</> : <>Order Placed</>}</div>
              </div>
            </div>
          </div>
        ))}
      {/* </div> */}
    </Layout>
  );
};

export default MyOrderScreens;
