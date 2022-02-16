const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/post', auth, postCtrl.post);
router.post('/response', postCtrl.reponse);
router.delete('/delete', postCtrl.deleteMsg);
router.get('/get', postCtrl.get);
router.get('/getAnswers', postCtrl.getAnswers);

module.exports = router;