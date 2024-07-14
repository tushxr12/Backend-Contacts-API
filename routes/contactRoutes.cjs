const express = require("express");
const router = express.Router();
var {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactController.cjs");
const { validateToken } = require("../middleware/validateTokenHandler.cjs");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
