var express = require('express');
var router = express.Router();
var controller=require('../controllers/profile.controller');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
router.get('/',controller.profile);
router.post('/',upload.single('avatar'),controller.postProfile);
module.exports = router;