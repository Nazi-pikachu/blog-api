const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Work in Progess");
});

app.listen(port, () => {
  console.log("server is running");
});
