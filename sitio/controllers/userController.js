const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')


let users = fs.readFileSync(path.join(__dirname, '..','data','users.json'), 'utf-8');
users = JSON.parse(users);

let ultimoId = (array) =>{
    let ultimoId;
 
 array.forEach(element =>{
     ultimoId = element.id
    
 })
   return ultimoId +1;
 }

let userController = {
    register:(req, res, next) =>{

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //cometio errores
            
            res.render('register', {errors: errors.errors,  title:'registro', css:"register.css"})
        }else{
            //registra el usuario
            let nuevoUsuario = {
                id: ultimoId(users),
                user:req.body.user,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)

            }
             //agregue a mi base de datos el usuario que cree anteriormente
     users.push(nuevoUsuario);
 
     //transformo mi db a Json
     let usersJSON = JSON.stringify(users); 
     //sobre escribo mi json de user con un nuevo json que contiene el nuevo usuario
     fs.writeFileSync(path.join(__dirname, '..','data','users.json'), usersJSON);
     res.redirect('/users/login');

        }
    },
    login:(req, res) =>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //cometio errores
            
            res.redirect('login', {errors: errors.errors,  title:'login', css:"register.css"})
        }else{
            //login  usuario
            users.forEach(user =>{
                if(user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)){
                    req.session.user == user.user;
                    res.redirect('/users/perfil')

                }
            });
            res.render('login',{errors:  [{msg : 'Usuario y contraseña incorrectos'}], title:'login', css:"register.css"})
            }
    },
    perfil:(req, res) =>{
        
        res.render('perfil', {user: req.session.user,  title:'perfil', css:"register.css"})
    }
}
module.exports = userController;