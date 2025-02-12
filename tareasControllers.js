const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/tareas.json');

// Obtener todas las tareas
const getTareas = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const tareas = JSON.parse(data);
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al leer las tareas' });
    }
};

// Crear una nueva tarea
const createTarea = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).json({ message: 'Título y descripción requeridos' });
        }

        const data = await fs.readFile(filePath, 'utf-8');
        const tareas = JSON.parse(data);
        const nuevaTarea = { id: Date.now(), titulo, descripcion };
        tareas.push(nuevaTarea);

        await fs.writeFile(filePath, JSON.stringify(tareas, null, 2));
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// Actualizar tarea
const updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;

        const data = await fs.readFile(filePath, 'utf-8');
        let tareas = JSON.parse(data);

        const index = tareas.findIndex(t => t.id == id);
        if (index === -1) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        tareas[index] = { ...tareas[index], titulo, descripcion };
        await fs.writeFile(filePath, JSON.stringify(tareas, null, 2));

        res.json(tareas[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Eliminar tarea
const deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await fs.readFile(filePath, 'utf-8');
        let tareas = JSON.parse(data);

        tareas = tareas.filter(t => t.id != id);
        await fs.writeFile(filePath, JSON.stringify(tareas, null, 2));

        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

module.exports = { getTareas, createTarea, updateTarea, deleteTarea };
