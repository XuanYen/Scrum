var express = require('express');
var multer  = require('multer');
var router = express.Router();
var controller=require('../controllers/upload.controller')
var upload = multer({ dest: './uploads/' });
router.get('/',controller.upload);
router.post('/',upload.single('cover'),controller.postUpload);
module.exports = router;