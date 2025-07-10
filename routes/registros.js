const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM secciones ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obtener uno por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM secciones WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear registro
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO secciones (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Editar
router.put('/:id', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await pool.query(
      'UPDATE secciones SET nombre = $1, descripcion = $2 WHERE id = $3',
      [nombre, descripcion, req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM secciones WHERE id = $1', [req.params.id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
