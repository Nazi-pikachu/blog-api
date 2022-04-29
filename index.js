const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  console.log(req);
  res.send("Work in progress");
});

app.listen(port, () => {
  console.log("server is running");
});
