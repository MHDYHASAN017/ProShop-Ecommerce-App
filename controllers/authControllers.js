const asyncHandler = require("express-async-handler");
const User = require("../models/userSchama");
const { generateToken } = require("../utils/generateToken");

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    users: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("No User Found With This Id");
  } else {
    return res.status(200).json({
      user: user,
    });
  }
});

const getProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found With This Token");
  }
});

const loginRoute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerRoute = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateUserRouter = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  const { name, email, isAdmin } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin === "adminUser" ? true : false;
    // console.log(user);
    const updateUser = await user.save();
    console.log(updateUser);
    return res.status(200).json({
      singleUser: updateUser,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found With This Id");
  }
});

const deleteUserRouter = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const d_user = await User.findById(req.params.id);

  if (d_user) {
    await d_user.remove();
    const users = await User.find({});
    res.status(200).json({
      users: users,
    });
  } else {
    res.status(404);
    throw new Error("User Not Fount");
  }
});

module.exports = {
  loginRoute,
  registerRoute,
  getProfile,
  allUsers,
  deleteUserRouter,
  getUserById,
  updateUserRouter,
};
