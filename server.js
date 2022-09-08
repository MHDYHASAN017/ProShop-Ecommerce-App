const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const path = require("path");
const { errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

//Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

///connect database
ConnectDB();

///Routes
const createPost = require("./routers/createPostRoute");
const productsRoute = require("./routers/productRoutes");
const authRoute = require("./routers/authRoutes");
const orderRoute = require('./routers/orderRoutes')
const uploadRoute = require('./routers/uploadRoutes')

app.use("/api/post", createPost);

app.use("/api", productsRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use('/api/upload' , uploadRoute)

app.use('/uploads', express.static(path.join( path.resolve(), '/uploads')))


app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}

///port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
