const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middlewares/auth');

router.post('/',authMiddleware, petController.createPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetById);
router.put('/:id',authMiddleware, petController.updatePet);
router.delete('/:id',authMiddleware, petController.deletePet);

module.exports = router;