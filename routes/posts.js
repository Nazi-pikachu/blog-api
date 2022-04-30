const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id/:postId", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // const user = await User.findById(req.params.id);
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(post);
  } else {
    res.status(500).json("You donot have the permession to update this post!");
  }
});

// DELETE POST
router.put("/:id", async (req, res) => {});

// GET
router.get("/:id", async (req, res) => {});

module.exports = router;
