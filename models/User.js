const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //_id: ObjectId
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: {},
  }
);

module.exports = User = mongoose.model("users", userSchema);
