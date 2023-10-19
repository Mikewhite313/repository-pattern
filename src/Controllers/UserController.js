// src/controllers/userController.js
const UserService = require("../Services/UserService");

// Create a new user
const CreateUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const ListUser = async (req, res) => {
  try {
    const listing = await UserService.listUser(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: "An Error Occurred" });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const find = await UserService.updateUser(req.body);
    res.status(201).json(find);
  } catch (error) {
    res.status(500).json({ error: "An Error Occurred" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const deleting = await UserService.deleteUser(req.body);
    res.status(201).json(deleting);
  } catch (error) {}
};

module.exports = { CreateUser, ListUser, UpdateUser, DeleteUser };
