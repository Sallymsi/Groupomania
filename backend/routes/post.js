const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-file');
const admin = require('../middleware/admin');

// Initialisation des routes à partir du Routeur d'Express :
router.post('/post', auth, multer, postCtrl.post);
router.post('/response', auth, postCtrl.reponse);
router.delete('/delete', auth, postCtrl.deleteMsg);
router.put('/update', auth, postCtrl.updateMsg);
router.get('/get', postCtrl.get);
router.get('/getAnswers', postCtrl.getAnswers);

module.exports = router;