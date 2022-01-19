const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/JWT");
const User = require("../models/users");
const url = require("url");
// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("email address has already been taken");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      watchList: user.watchList,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    get userdetails
// @route   get /api/v1/users
// @access  Private

const getUserDetails = asyncHandler(async (req, res) => {
  const { _id } = url.parse(req.url, true).query;
  // const { _id } = req.body;
  const user = await User.findOne({ _id });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      watchList: user.watchList,
    });
  } else {
    res.status(400);
    throw new Error("user Not found");
  }
});

// @desc    get DocLists
// @route   get /api/v1/users/doctor
// @access  Private

const getDocLists = asyncHandler(async (req, res) => {
  const { specialist } = req.body;
  const docList = await User.find(
    { isDoctor: true, specialist },
    { password: 0, height: 0, weight: 0, bloodGroup: 0 }
  );

  if (docList) {
    res.status(200).json({
      docList: docList,
    });
  } else {
    res.status(400);
    throw new Error("Doctors Not found");
  }
});

module.exports = { authUser, registerUser, getUserDetails, getDocLists };
