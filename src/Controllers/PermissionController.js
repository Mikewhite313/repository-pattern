// src/controllers/userController.js
const PermissionService = require("../Services/PermissionService");

// Create a new user
const CreatePermission = async (req, res) => {
  try {
    const newRole = await PermissionService.createPermission(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = CreatePermission;
