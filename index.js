const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',           // React local
    'http://localhost:5173',           // Vite local
    'https://mllearn-1-jugb.onrender.com',  // tu frontend desplegado (ajústalo)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


app.use(express.json());

const registrosRouter = require('./routes/registros');
app.use('/api/registros', registrosRouter);

app.get('/', (req, res) => {
  res.send('API funcionando para Learning Hub');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
