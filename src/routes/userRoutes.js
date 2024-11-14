const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const userController = require('../controllers/userController');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Admin routes
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/user/:id', authMiddleware, userController.getUser)
router.put('/user/:id', authMiddleware, userController.updateUser)
router.delete('/user/:id', authMiddleware, userController.deleteUser);


module.exports = router;