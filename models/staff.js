const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  doB: {
    type: String,
    required: true
  },
  salaryScale: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  annualLeave: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  workTimes: {
    item: [
      {
        workTimeId: {
          type: Schema.Types.ObjectId,
          ref: "WorkTime",
          required: true
        },
        totalTime: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

module.exports = mongoose.model("Staff", staffSchema);
