const pool = require('../config/db');

const createPet = async (req, res) => {
  try {
    const { name, species, breed, description } = req.body;
    if (!req.user || !req.user.id) {
      console.log('User auth debug:', req.user); // Debug line
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const userId = req.user.id; // From auth middleware
    
    const [result] = await pool.execute(
      'INSERT INTO pets (name, species, breed, description, UserId) VALUES (?, ?, ?, ?, ?)',
      [name, species, breed, description, userId]
    );
    
    res.status(201).json({ 
      message: 'Mascota registrada exitosamente',
      petId: result.insertId
    });
  } catch (error) {
    console.error('Create pet error:', error); // Debug line
    res.status(500).json({ error: error.message });
  }
};

const getAllPets = async (req, res) => {
  try {
    const [pets] = await pool.execute('SELECT * FROM pets');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const [pet] = await pool.execute('SELECT * FROM pets WHERE id = ?', [id]);
    
    if (pet.length === 0) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    res.status(200).json(pet[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, description } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const userId = req.user.id;

    const [result] = await pool.execute(
      'UPDATE pets SET name = ?, species = ?, breed = ?, description = ? WHERE id = ? AND UserId = ?',
      [name, species, breed, description, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mascota no encontrada o no autorizado' });
    }

    res.status(200).json({ message: 'Mascota actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const userId = req.user.id;

    const [result] = await pool.execute(
      'DELETE FROM pets WHERE id = ? AND UserId = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Mascota no encontrada o no autorizado' });
    }

    res.status(200).json({ message: 'Mascota eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
};