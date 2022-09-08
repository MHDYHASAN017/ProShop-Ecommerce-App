const express = require("express");
const router = express.Router();
const { getAllOrder, placeOrder , getOrdersByUser , getSingleOrderById } = require("../controllers/orderControllers");
const { isAuthValid } = require("../middlewares/isAuthValid");

router.get("/get_all_orders", isAuthValid ,getAllOrder);
router.post("/placeorder", placeOrder);
router.get('/ordersById' , isAuthValid ,getOrdersByUser)
router.get('/single_order/:order_id' , getSingleOrderById)


module.exports = router;
