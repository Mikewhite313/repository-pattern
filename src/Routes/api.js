const express = require("express");
const router = express.Router();
const userservice = require("../Controllers/UserController");
const createrole = require("../Controllers/RoleController");
const createpermission = require("../Controllers/PermissionController");

router.post("/user/create", userservice.CreateUser);
router.get("/user/list", userservice.ListUser);
router.post("/user/update", userservice.UpdateUser);
router.post("/role/create", createrole);
router.post("/permission/create", createpermission);

module.exports = router;
