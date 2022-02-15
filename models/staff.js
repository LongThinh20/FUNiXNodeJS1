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
  overTime: {
    type: Number,
    required: true
  }
});

staffSchema.methods.updateAnnualLeave = function (hours) {
  const day = hours / 8;

  this.annualLeave = this.annualLeave - day;

  if (this.annualLeave >= 0) {
    this.save();
  } else {
    this.annualLeave = 0;
    this.save();
  }
};

module.exports = mongoose.model("Staff", staffSchema);
