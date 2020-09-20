
 const {check, validationResult, body} = require('express-validator');
 
module.exports = [
    check('email').isEmail().withMessage('El campo email tiene un formato incorrecto'),
    check('password').isLength({min:8}).withMessage('La contraseña debe tener mas de 8 caracteres')
  ]