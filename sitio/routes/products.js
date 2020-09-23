var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');
const { Router } = require('express');

router.get('/', productsController.listado);
router.get('/detalle/:id', productsController.detalle)
router.get('/search', productsController.search);
router.get('/agregarProducto',(rer,res) => res.render('agregarProducto',{ title:'agregar producto'}));
router.post('/agregarProducto', productsController.agregar);

router.get('/editarProducto/:id', productsController.editForm);
router.put('/editarProducto/:id', productsController.edit);
router.delete('/delete/:id', productsController.eliminar)

module.exports = router;