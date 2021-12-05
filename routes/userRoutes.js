import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserDetails,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUserDetails);
router.post("/login", authUser);

export default router;
