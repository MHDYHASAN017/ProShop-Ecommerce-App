const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const Orders = require("../models/orderSchema");
const stripe = require("stripe")(
  "sk_test_51KFa1sJkRFJsB3tspZvRCjnyy9KmLYN1WKgZxNb1ICnbFSylrgeWgXn37kEYgFHfY7vqlx5xOFIyl0YpaUNXBkzN00CFt0PtvY"
);
const Order = require("../models/orderSchema");

const getAllOrder = asyncHandler(async (req, res) => {


  const orders = await Orders.find({});

  if (!orders) {
    res.status(400);
    throw new Error("Orders Not Found!");
  } else {
    return res.status(200).json({
      orders: orders,
    });
  }

  console.log("conne");
});

const placeOrder = asyncHandler(async (req, res) => {
  const { token, subTotal, user, cartItem } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const payment = await stripe.charges.create(
    {
      amount: subTotal,
      currency: "USD",
      customer: customer.id,
      receipt_email: user.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (payment) {
    const order = new Order({
      userId: user._id,
      name: user.name,
      email: user.email,
      orderItems: cartItem,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        postalCode: token.card.address_zip,
        country: token.card.address_country,
      },
      orderAmount: subTotal,
      transactionID: payment.source.id,
      isDelivered: false,
    });

    const orderSave = await order.save();

    if (!orderSave) {
      res.status(400);
      throw new Error("Order Not Saved");
    } else {
      return res.status(200).json({
        msg: "order placed successfully",
      });
    }
  } else {
    res.status(400);
    throw new Error("SomeThing is Wrong In payment Getway");
  }
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });

  if (!orders) {
    return res.status(400).json({
      message: "No Order Found For This User",
    });
  } else {
    return res.status(200).json({
      orders: orders,
    });
  }
});

const getSingleOrderById = asyncHandler(async (req, res) => {
  const singleOrder = await Order.findById(req.params.order_id);
  if (!singleOrder) {
    res.status(400);
    throw new Error("Something Went Wrong");
  } else {
    return res.status(200).json({
      singleOrder: singleOrder,
    });
  }
});

module.exports = {
  getAllOrder,
  placeOrder,
  getOrdersByUser,
  getSingleOrderById,
};
