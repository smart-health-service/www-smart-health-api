const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "scheduled",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    notifier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = new mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
