const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = model("Permission", permissionSchema);

module.exports = Permission;
