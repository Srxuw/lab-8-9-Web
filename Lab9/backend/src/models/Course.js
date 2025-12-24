const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructorName: String,
  price: Number,
  category: String,
},
{ _id: true});

module.exports = mongoose.model("Course", courseSchema);
