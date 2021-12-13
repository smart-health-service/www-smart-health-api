const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointments");
const User = require("../models/users");
const url = require("url");

// @desc    create AppointMent
// @route   POST /api/appoinments
// @access  private
const createAppointment = asyncHandler(async (req, res) => {
  const { creator, notifier, startTime, endTime } = req.body;

  const userExists = await User.findOne({ _id: creator });
  const docExists = await User.findOne({ _id: notifier });

  if (userExists && docExists) {
    const appointment = await Appointment.create({
      creator,
      notifier,
      startTime,
      endTime,
    });

    if (appointment) {
      const createAppointment = await appointment.save();
      res.status(201).json(createAppointment);
    } else {
      res.status(400);
      throw new Error("failed");
    }
  } else {
    res.status(400);
    throw new Error("user/doctor not found");
  }
});

module.exports = { createAppointment };
