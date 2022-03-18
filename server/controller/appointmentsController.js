const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointments");
const User = require("../models/users");
const url = require("url");

// @desc    create AppointMent
// @route   POST /api/v1/appoinments
// @access  private
const createAppointment = asyncHandler(async (req, res) => {
  const { creator, assignee, date, time } = req.body;

  const userExists = await User.findOne({ _id: creator });
  const docExists = await User.findOne({ _id: assignee });

  if (userExists && docExists) {
    const appointment = await Appointment.create({
      creator,
      assignee,
      date,
      time,
    });

    if (appointment) {
      const BookedSlots = await Appointment.find(
        { assignee, date },
        {
          _id: 0,
          time: 1,
        }
      );

      res.status(200).send(BookedSlots);
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
  const { creator, assignee } = url.parse(req.url, true).query;

  let whereQuery = {};

  if (creator) {
    whereQuery["creator"] = creator;
  }

  if (assignee) {
    whereQuery["assignee"] = assignee;
  }
  // res.status(201).json(whereQuery);
  const list = await Appointment.find(whereQuery).sort({ createdAt: -1 });

  if (list) {
    const asyncRes = await Promise.all(
      list.map(async (e) => {
        return {
          ...e._doc,
          ["creator"]: await User.findOne(
            { _id: e["creator"] },
            {
              name: 1,
              email: 1,
            }
          ),
          ["assignee"]: await User.findOne(
            { _id: e["assignee"] },
            {
              name: 1,
              email: 1,
              specialist: 1,
            }
          ),
        };
      })
    );

    res.status(200).json(asyncRes);
  } else {
    res.status(400);
    throw new Error("no data found");
  }
});

// @desc    update AppointMent
// @route   post /api/v1/appoinments/status
// @access  private
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { _id, status, roomId } = req.body;
  const appointment = await Appointment.findById({ _id });

  if (appointment) {
    appointment.status = status;

    if (roomId) {
      appointment.room = roomId;
    }
    const updatedAppointment = await appointment.save();

    res.status(200).send(updatedAppointment);
  } else {
    res.status(400).send("no appointments found");
  }
});

// @desc    check availableSlot
// @route   post /api/v1/appoinments/status
// @access  private
const checkAvailableSlots = asyncHandler(async (req, res) => {
  const { _id, date } = url.parse(req.url, true).query;

  const appointment = await Appointment.find(
    { assignee: _id, date },
    {
      _id: 0,
      time: 1,
    }
  );

  res.send(appointment);
});

module.exports = {
  createAppointment,
  getUserAppointments,
  updateAppointmentStatus,
  checkAvailableSlots,
};
