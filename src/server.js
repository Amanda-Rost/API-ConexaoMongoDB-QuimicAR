const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

const Composto = require('./schema/composto');

app.get('/', (req, res) => {
  res.send('API está ativa :D');
});

// RESTful Endpoints
app.get('/compostos/formato/:formato', async (req, res) => {
  try {
    const composto = await Composto.findOne({ formato: new RegExp(`^${req.params.formato}$`, 'i') });
    if (composto) {
      res.json(composto);
    } else {
      res.status(404).send('Composto not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
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
  console.log(`Servidor está sendo executado em http://localhost:${PORT}/ 🥰😍🥰
    `);
});
