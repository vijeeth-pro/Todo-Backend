const mongoose = require("mongoose");

const list = new mongoose.Schema({
  todo: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("list", list);
