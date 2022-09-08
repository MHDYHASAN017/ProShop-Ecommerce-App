const express = require("express");
const router = express.Router();
const {
  loginRoute,
  registerRoute,
  getProfile,
  allUsers,
  deleteUserRouter,
  updateUserRouter,
  getUserById,
} = require("../controllers/authControllers");
const { isAuthValid, isAdminUser } = require("../middlewares/isAuthValid");

router.post("/login", loginRoute);

router.post("/register", registerRoute);

router.get("/profile", isAuthValid, getProfile);

router.get("/all_users", isAdminUser, allUsers);

router.delete("/delete_user/:id", isAdminUser, deleteUserRouter);

router.get("/userById/:id", getUserById);

router.put("/update/:id", updateUserRouter);

module.exports = router;
