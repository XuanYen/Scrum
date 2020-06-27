var express = require('express');
var router = express.Router()
var controller=require('../controllers/signup.controller')
router.get('/',controller.signup);
router.post('/',controller.postSignup);
module.exports = router;