const express = require('express');
const bodyParser = require('body-parser');
const tareasRoutes = require('./routes/tareas');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/tareas', tareasRoutes);
app.use('/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
