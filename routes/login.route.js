var express = require('express');
var router = express.Router()
var controller=require('../controllers/login.controller')
router.get('/',controller.login);
router.post('/',controller.postLogin);
router.get('/logout',controller.logout);
module.exports = router;