const User = require("../models/userModel");
const mongoose = require("mongoose");
// get all user
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ cretedAt: -1 });

  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// create new user
const createUser = async (req, res) => {
  const { email, username, password, user_type, muet_band, start_session } =
    req.body;

  // add doc to db
  try {
    const user = await User.create({
      email,
      username,
      password,
      user_type,
      muet_band,
      start_session,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
