const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const covidSchema = new Schema({
  vaccineInfo: [
    {
      vaccine_1: {
        vaccineType: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        }
      }
    },
    {
      vaccine_1: {
        vaccineType: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        }
      }
    }
  ],
  infected: {
    infectedDate: Date,
    cureDate: Date
  },
  tempInfo: [
    {
      bodyTemp: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ],
  staffId: {
    type: Schema.Types.ObjectId,
    require: true
  }
});

module.exports = mongoose.model("covid", covidSchema);
