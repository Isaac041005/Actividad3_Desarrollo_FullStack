const express = require('express');
const { getTareas, createTarea, updateTarea, deleteTarea } = require('../controllers/tareasController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas protegidas por autenticación
router.get('/', authMiddleware, getTareas);
router.post('/', authMiddleware, createTarea);
router.put('/:id', authMiddleware, updateTarea);
router.delete('/:id', authMiddleware, deleteTarea);

module.exports = router;
