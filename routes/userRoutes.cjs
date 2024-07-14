const express = require("express");

const router = express.Router();

var {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController.cjs");

const { validateToken } = require("../middleware/validateTokenHandler.cjs");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
