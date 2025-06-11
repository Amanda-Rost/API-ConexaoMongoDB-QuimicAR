const mongoose = require('mongoose');

const CompostoSchema = new mongoose.Schema({
  formato: String,
  nomenclatura: String,
  objeto3D: String,
  config3D: String,
  textura: String
});

const Composto = mongoose.model('Composto', CompostoSchema);

module.exports = Composto;