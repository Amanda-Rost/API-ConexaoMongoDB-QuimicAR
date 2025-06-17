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
const Admin = require('./schema/admin');

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

app.post('/compostos', async (req, res) => {
  const { user, senha, formato,
    nomenclatura,
    objeto3D,
    config3D,
    textura } = req.body;

  const admin = await Admin.findOne({ user,
  senha});
  if (!admin) {
    return res.status(403).send('Acesso negado');
  }
  else {
    const composto = new Composto({
      formato,
      nomenclatura,
      objeto3D,
      config3D,
      textura
    });
    await composto.save();
    return res.status(201).json(composto);
  }
});

 
app.put('/compostos/:id', async (req, res) => {
 const idComposto = req.params.id; 
 const { user, senha, formato,
    nomenclatura, textura, objeto3D, config3D } = req.body;
 const admin = await Admin.findOne({ user,
  senha});
  if (!admin) {
    return res.status(403).send('Acesso negado');
  }
  else {
    const compostoAtualizado = await Composto.findByIdAndUpdate(
      idComposto,
      {
        formato,
        nomenclatura,
        textura,
        objeto3D,
        config3D
      },)
   return res.status(200).json(compostoAtualizado);
  }
});

app.delete('/compostos/:id', async (req, res) => {
  const idComposto = req.params.id;
  const { user, senha } = req.body;

  const admin = await Admin.findOne({ user,
  senha});
  if (!admin) {
    return res.status(403).send('Acesso negado');
  }else{
    try {
      const composto = await Composto.findByIdAndDelete(idComposto);
      if (composto) {
        res.status(200).send('Composto deletado com sucesso');
      } else {
        res.status(404).send('Composto não encontrado');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado em http://localhost:${PORT}/ 🥰😍🥰
    `);
});
