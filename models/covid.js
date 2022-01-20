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
    infectedDate: {
      type: Date,
      required: true
    },
    cureDate: {
      type: Date,
      required: true
    }
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
  ]
});

module.exports = mongoose.model("covid", covidSchema);
