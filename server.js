
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const CONNECTION_STRING = "mongodb+srv://aluno:QuimicAR@cluster0.nc4hk.mongodb.net/QuimicAR";

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define a simple schema and model
const CompostoSchema = new mongoose.Schema({
  formato: String,
  nomenclatura: String,
  objeto3D: Buffer,
  config3D: Buffer,
  textura: Buffer
});

const Composto = mongoose.model('Composto', CompostoSchema);

// RESTful Endpoints
app.get('/compostos/formato/:formato', async (req, res) => {
  try {
    const composto = await Composto.findOne({ formato: req.params.formato });
    if (composto) {
      res.json(composto);
    } else {
      res.status(404).send('Composto not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/', (req, res) => {
  res.send('API está ativa :D');
});

app.get('/compostos/nomenclatura/:nomenclatura', async (req, res) => {
  try {
    const composto = await Composto.findOne({ nomenclatura: new RegExp(`^${req.params.nomenclatura}$`, 'i') });
    if (composto) {
      res.json(composto);
    } else {
      res.status(404).send('Composto not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta:  ${PORT}`);
});
