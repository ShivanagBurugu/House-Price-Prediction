const mongoose = require("mongoose");
let History = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  bath: {
    type: Number,
    required: true,
  },
  bhk: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});
module.exports = mongoose.model("History", History);
