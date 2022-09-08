const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const users = require("./data/users");
const products = require("./data/products");
const Users = require("./models/userSchame");
const Products = require("./models/productSchema");
const Orders = require("./models/orderSchema");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB()

const importData = async () => {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();

    const createdUsers = await Users.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Products.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Orders.deleteMany();
    await Products.deleteMany();
    await Users.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
