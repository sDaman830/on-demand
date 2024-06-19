const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  queries: [
    {
      query: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
