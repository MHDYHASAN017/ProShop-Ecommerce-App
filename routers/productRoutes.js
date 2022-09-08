const express = require("express");
const router = express.Router();
const Products = require("../models/productSchema");
const {isAuthValid} = require('../middlewares/isAuthValid')

const {
  getAllproducts,
  getProductById,
  createProduct , 
  updateProduct , 
  deleteProduct
} = require("../controllers/productControllers");

router.get("/products/all", getAllproducts);

router.get("/product/:id", getProductById);

router.post(`/admin/create` , isAuthValid, createProduct)

router.put(`/admin/edit/:id` , isAuthValid, updateProduct)

router.delete(`/admin/del/:id` , isAuthValid, deleteProduct)



module.exports = router;
