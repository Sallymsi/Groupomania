const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteUser', auth, userCtrl.deleteUser);
router.get('/getImgById/:userId', userCtrl.getImgById);
router.get('/getAdmin', userCtrl.getAdmin);
router.post('/changeInfo', auth, multer, userCtrl.changeInfo);

module.exports = router;