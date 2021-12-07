const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  authUser,
  registerUser,
  getUserDetails,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(registerUser).get(getUserDetails);
router.post("/login", authUser);

module.exports = router;
