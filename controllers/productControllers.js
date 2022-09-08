const asyncHandler = require("express-async-handler");
const Products = require("../models/productSchema");

const getAllproducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});

  return res.status(200).json({
    products: products,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  return res.status(200).json({
    product: product,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  // console.log(req.body);

  const product = new Products({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
  });

  const createdProduct = await product.save();

  return res.status(200).json({
    message: "product added successfully",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;    
    product.description = req.body.description;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    const updateProduct = await product.save();

    return res.status(200).json({
      message: "product updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Products.findById(req.params.id);

  if (product) {
    const updateProduct = await product.remove();
    return res.status(200).json({
      message: "product deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found With This Id");
  }
});

module.exports = {
  getAllproducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
