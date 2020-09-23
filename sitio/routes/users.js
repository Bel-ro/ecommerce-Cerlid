var express = require('express');
var router = express.Router();

 var usersController = require('../controllers/usersController');
 var registerValidator = require('../validations/registerValidator');
 var loginValidator = require('../validations/loginValidator');

/* GET users listing. */
router.get('/', (req,res) => res.render('register',{ title:'registro', css:"register.css"}));

router.post('/register',registerValidator, usersController.register);

router.get('/login', (req, res) =>res.render('login',{ title:'login', css:"register.css"}));

router.post('/login',loginValidator, usersController.login);

router.get('/perfil', usersController.perfil);
module.exports = router;
