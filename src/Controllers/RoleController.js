// src/controllers/userController.js
const RoleService = require("../Services/RoleService");

// Create a new user
const CreateRole = async (req, res) => {
  try {
    const newRole = await RoleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = CreateRole;
