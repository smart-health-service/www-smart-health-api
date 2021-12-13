const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createAppointment } = require("../controller/appointmentsController");

const router = express.Router();

router.route("/").post(createAppointment);

module.exports = router;
