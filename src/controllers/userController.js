// Agregar a src/controllers/userController.js

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const [users] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
  
      if (users.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getProfile = async (req, res) => {
    try {
      const [users] = await pool.execute(
        'SELECT id, name, email, role FROM users WHERE id = ?',
        [req.user.id]
      );
      res.json(users[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      await pool.execute(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, req.user.id]
      );
      res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No autorizado' });
      }
      const [users] = await pool.execute('SELECT id, name, email, role FROM users');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getUser = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No autorizado' });
      }
      const [users] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [req.params.id]);
      
      if (users.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(users[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateUser = async (req, res) => {
      try {
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'No autorizado' });
        }
  
        const { name, email, role } = req.body;
        const [result] = await pool.execute(
          'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
          [name, email, role, req.params.id]
        );
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
  
        res.json({ message: 'Usuario actualizado exitosamente' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
  
  const deleteUser = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No autorizado' });
      }
      await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
  };