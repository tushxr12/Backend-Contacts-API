const express = require("express");

const router = express.Router();

var {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController.cjs");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

module.exports = router;
