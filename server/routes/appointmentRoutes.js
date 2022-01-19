const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createAppointment,
  getUserAppointments,
  updateAppointmentStatus,
  checkAvailableSlots,
} = require("../controller/appointmentsController");

const router = express.Router();

router.route("/").post(createAppointment).get(getUserAppointments);
router.route("/status").post(updateAppointmentStatus).get(checkAvailableSlots);

module.exports = router;
