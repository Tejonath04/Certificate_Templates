const mongoose = require("mongoose");

const inputDataSchema = new mongoose.Schema({
  clientid:String,
  tid: String,
  data: Object,
  images: Object
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('InputData', inputDataSchema);