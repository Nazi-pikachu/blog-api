const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const disk = require("multer/storage/disk");
const { diskStorage } = require("multer");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

app.get("/", (req, res) => {
  res.send("Work in Progess");
});

app.listen(port, () => {
  console.log("server is running");
});
