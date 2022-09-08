const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    orderItems: [
      {
        name: { type: String },
        qty: { type: Number },
        _id: { type: String },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    orderAmount: {
      type: Number,
    },
    transactionID: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
