const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/test', userController.test);
router.post('/save', userController.userSave);
router.post('/login', userController.loginUser);
router.get('/allUsers', userController.getAllUsers)
router.get('/:id', userController.getUser);


module.exports = router