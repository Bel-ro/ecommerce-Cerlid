const fs = require('fs');
const path = require('path');

let productosIndex = fs.readFileSync(path.join(__dirname, '..','data','productosIndex.json'), 'utf-8');

productosIndex = JSON.parse(productosIndex);

let productos = fs.readFileSync(path.join(__dirname, '..','data','productos.json'), 'utf-8');
productos = JSON.parse(productos)

module.exports = {
    listado: (req, res) =>{
        res.render('index',{ 
            productos: productosIndex,
            title : 'Home',
            css:'index.css'})
    }}