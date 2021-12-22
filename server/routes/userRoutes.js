const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  authUser,
  registerUser,
  getUserDetails,
  getDocLists,
} = require("../controller/userController");

const router = express.Router();

router.post("/users/login", authUser);
router.route("/users").post(registerUser).get(getUserDetails);
router.route("/doctor").get(getDocLists);

module.exports = router;
