const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Conectado com o MongoDB Atlas com sucesso :D');
  } catch (error) {
    console.error('Falha em conectar com MongoDB Atlas :(', error.message);
  }
};

module.exports = connectDB;
