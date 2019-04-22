const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/test', userController.test);
router.post('/save', userController.userSave);
router.get('/:id', userController.getUser);


module.exports = router