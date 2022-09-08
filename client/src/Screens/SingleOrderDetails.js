import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import { getSingleOrderByOrderId } from "../Redux/actions/orderActions";
import Loader from "../UI/Loader";

const SingleOrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderReducers = useSelector((state) => state.orderReducers);
  const { singleOrder, loading } = orderReducers;

  console.log(singleOrder);

  useEffect(() => {
    dispatch(getSingleOrderByOrderId(params.id));
  }, [params.id, dispatch]);

  if (loading === true || singleOrder === null) {
    return <Loader></Loader>;
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <div className="list-group ">
            <div className="list-group-item">
              <div className="theme_background_color text-white p-1">
                order-Id : {singleOrder._id}
              </div>
            </div>
            <div className="list-group-item">
              <div className="theme_background_color text-white p-1">
                user name : {singleOrder.name}
              </div>
            </div>
            <div className="list-group-item">
              <div className="theme_background_color text-white p-1">
                order email : {singleOrder.email}
              </div>
            </div>
            <div className="list-group-item">
              <div className="theme_background_color text-white p-1">
                order is-Delivered :{" "}
                {singleOrder.isDelivered === true ? "Deliverd" : "Order Placed"}
              </div>
            </div>
            <div className="list-group-item">
              <div className="theme_background_color text-white p-1">
                order amount : ${singleOrder.orderAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
            <div className="text-xl text-center">
                Ordered Items 
            </div>
            {
                singleOrder.orderItems.map((order , idx) => (
                    <div className="card p-2 border-green-800 my-2" key={idx}>
                        <div>
                            Order Name : {order.name}
                        </div>
                        <div>
                            Order Quantity : {order.qty}
                        </div>
                        <div>
                            Order Price : {order.price}
                        </div>
                    </div>  
                ))
            }
        </div>
      </div>
    </Layout>
  );
};

export default SingleOrderDetails;
