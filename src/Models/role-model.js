const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = model("Role", roleSchema);

module.exports = Role;
