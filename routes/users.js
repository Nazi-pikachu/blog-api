const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Post = require("../models/post");

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const deleteUser = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: deleteUser.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json("You can delete only your account");
    }
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    const { password, ...others } = getUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
