
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataSchema = new Schema(
  {
    id: Number, 
    Title: String, 
    Photo: String, 
    Description: String, 
    Short_Description: String
  },
  { timestamps: true },
  { collection : 'test' }
);
module.exports = mongoose.model("test", DataSchema, 'test');