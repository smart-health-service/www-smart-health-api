const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { boolean } = require("yargs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      default: "https://source.unsplash.com/random/200x200",
    },
    isDoctor: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialist: {
      type: String,
      default: null,
    },
    edu_history: {
      type: Array,
      default: null,
    },
    bloodGroup: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
