const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointments");
const User = require("../models/users");
const url = require("url");

// @desc    create AppointMent
// @route   POST /api/v1/appoinments
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

// @desc    get AppointMents
// @route   get /api/v1/appoinments
// @access  private
const getUserAppointments = asyncHandler(async (req, res) => {
  const { _id, creator, notifier } = url.parse(req.url, true).query;

  let whereQuery = {};

  if (creator) {
    whereQuery["creator"] = creator;
  }

  if (notifier) {
    whereQuery["notifier"] = notifier;
  }
  // res.status(201).json(whereQuery);
  const list = await Appointment.find(whereQuery);

  if (list) {
    res.status(200).json(list);
  } else {
    res.status(400);
    throw new Error(_id);
  }
});

// @desc    update AppointMent
// @route   post /api/v1/appoinments/status
// @access  private
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { _id , status } = req.body;

  const appointment = await Appointment.findOne({ _id });

  if (appointment) {
    appointment.status = status
    const updatedAppointment = await appointment.save();

    res.status(200).send(updatedAppointment);

  } else {
    res.status(400).send("no appointments found");
  }
});

module.exports = {
  createAppointment,
  getUserAppointments,
  updateAppointmentStatus,
};
