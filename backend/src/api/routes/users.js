const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

// Define routes for user-related operations
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/update', userController.updateProfile);
router.delete('/delete', userController.deleteUser);

module.exports = router;