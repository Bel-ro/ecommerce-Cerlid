const fs = require('fs');
const path = require('path');

 let users = fs.readFileSync(path.join(__dirname, '..','data','users.json'), 'utf-8');
users = JSON.parse(users);

 
 const {check, validationResult, body} = require('express-validator');
module.exports = [
    check('user').isLength({min:3}).withMessage('El usuario debe tener como minimo 3 caracteres').isAlpha().withMessage('El usario debe ser solo letras'),
    check('email').isEmail().withMessage('El campo email tiene un formato incorrecto'),
    body('email').custom((value) =>{
      
        for (let i = 0; i < users.length; i++) {
          if(users[i].email == value){
            return false;
          }
          
        }
      return true;
    }).withMessage('Ese mail ya esta registrado'),
    check('password').isLength({min:8}).withMessage('La contraseña debe tener mas de 8 caracteres')
  ]