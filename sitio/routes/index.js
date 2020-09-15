var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
/* GET home page. */
router.get('/', indexController.listado);

module.exports = router;


    