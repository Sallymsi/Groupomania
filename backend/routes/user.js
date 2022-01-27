const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserId', userCtrl.getUserId);


module.exports = router;