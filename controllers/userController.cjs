const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.cjs");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are required.");
  } else {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered.");
    } else {
      //hashing user password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password : ", hashedPassword);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
      } else {
        res.status(400);
        throw new Error("User data not valid");
      }
    }
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesToken = jwt.sign({
      user: { username: user.username },
    });
    res.status(200).json({ accessToken });
  }
});

//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
