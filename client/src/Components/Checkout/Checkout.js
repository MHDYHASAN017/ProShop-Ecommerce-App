import React from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../../Redux/actions/orderActions";

const Checkout = ({amount}) => {

    const dispatch = useDispatch()

  const tokenHandler = (token) => {
    // console.log(token);
    dispatch(placeOrder(token , Number(amount)))
  };

  return (
    <div>
      <StripeCheckout
        token={tokenHandler}
        stripeKey="pk_test_51KFa1sJkRFJsB3tsiyFHDmahGyqU25bPIVIYfEI3F2lye4SwLprDQGmeukh7kEO8SNRwkyfHxyjmzrbagFTLtqwC00XCFOhu1Z"
        amount={Number(amount)}
        shippingAddress
      >
        <button className="btn btn-dark col-12">proceed to checkout</button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
