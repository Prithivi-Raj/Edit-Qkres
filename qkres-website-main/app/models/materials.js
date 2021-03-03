const mongoose = require("mongoose")

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  }
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material
