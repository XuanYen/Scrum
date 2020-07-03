var express = require('express');
var router = express.Router()
var controller=require('../controllers/exchange.controller')
router.get('/:id',controller.index);
module.exports = router;
