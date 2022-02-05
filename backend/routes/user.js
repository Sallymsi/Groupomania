const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserId', userCtrl.getUserId);
router.get('/getImgById/:userId', userCtrl.getImgById);
router.post('/changeInfo', multer, userCtrl.changeInfo);


module.exports = router;