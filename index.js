const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const registrosRouter = require('./routes/registros');
app.use('/api/registros', registrosRouter);

app.get('/', (req, res) => {
  res.send('API funcionando para Learning Hub');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
