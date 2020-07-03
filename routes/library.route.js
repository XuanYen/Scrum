var express = require('express');
var router = express.Router()
var controller=require('../controllers/library.controller')
router.get('/',controller.index);
router.post('/', controller.search);
module.exports = router;
