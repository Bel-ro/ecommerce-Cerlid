var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');
var multer = require('multer');
var path = require('path');
var consoleLogMw = require ('../middlewares/consoleLogMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '..', 'public','images', 'productImages'))
    },
    filename: function (req, file, cb) {
       
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/', consoleLogMw , productsController.listado);
router.get('/detalle/:id', consoleLogMw, productsController.detalle)
router.get('/search', productsController.search);
router.get('/agregarProducto',(req,res) => res.render('agregarProducto',{ title:'agregar producto', css:"productos.css"}));
router.post('/agregarProducto', upload.any(),  productsController.agregar);

router.get('/editarProducto/:id', productsController.editForm);
router.put('/editarProducto/:id', productsController.edit);
router.delete('/delete/:id', productsController.eliminar);

module.exports = router;