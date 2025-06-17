const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  user: String,
  senha: String
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;