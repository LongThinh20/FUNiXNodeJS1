const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workTimeSchema = new Schema({
  workSpace: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true
  }
});

module.exports = mongoose.model("WorkTime", workTimeSchema);
