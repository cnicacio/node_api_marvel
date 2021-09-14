const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
  },
  identity: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Character", characterSchema);
