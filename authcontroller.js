const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, '../data/usuarios.json');
const SECRET_KEY = 'supersecreto123';

// Registro de usuario
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
        }

        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);

        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };

        users.push(newUser);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro' });
    }
};

// Inicio de sesión
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(user => user.username === username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};

module.exports = { registerUser, loginUser };
