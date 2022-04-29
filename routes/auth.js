const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(500).json("Wrong credentials!");
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(500).json("Wrong credentials");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
