const fs = require('fs');
const path = require('path');

let productos = fs.readFileSync(path.join(__dirname, '..','data','productos.json'), 'utf-8');
productos = JSON.parse(productos)

module.exports = {
    listado: (req, res) =>{
        res.render('productos',{listaDeProductos : productos, title : 'Productos', css:"productos.css"})
    },
    detalle: (req, res) =>{
        let productoElegido;
        
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                productoElegido = producto 
            }           
        });
        res.render('detalleProducto', {producto : productoElegido, title :productoElegido.nombre, css:"productos.css"}) 
    },
    search: (req,res) => {
        req.query.busqueda;
    },
    agregar: (req,res) =>{
        
     let productoNuevo= {
         id: productos.length + 1,
         nombre : req.body.nombre,
         precio : req.body.precio,
         categoria: req.body.categoria,
         categoria: req.body.subcategoria,
         descripcion:req.body.descripcion
     }
     //agregue a mi base de datos el productoque cree anteriormente
     productos.push(productoNuevo);
 
     //transformo mi db a Json
     let productosJson = JSON.stringify(productos); 
     //sobre escribo mi json de productos con un nuevo json que contiene el nuevo producto
     fs.writeFileSync(path.join(__dirname, '..','data','productos.json'), productosJson);
     res.redirect('/products');
    },
    editForm: (req,res) =>{
        let productoAEditar;

        productos.forEach(producto => {
            if(producto.id == req.params.id){
                productoAEditar = producto 
            }           
        });
        res.render('editarProducto', {producto: productoAEditar, title: 'Editar Producto',css:"productos.css"})
    },
    edit:(req,res) =>{
        //buscado el producto a editar en la base de datos
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                producto.nombre = req.body.nombre; 
                producto.precio = req.body.precio;
                producto.categoria = req.body.categoria;
                producto.subcategoria = req.body.subcategoria;  
                producto.descripcion = req.body.descripcion; 
            }           
        });
         //transformo mi db a Json
     let productosJson = JSON.stringify(productos); 
     //sobre escribo mi json de productos con un nuevo json que contiene el nuevo producto
     fs.writeFileSync(path.join(__dirname, '..','data','productos.json'), productosJson);
     
     res.redirect('/products/detalle/'+ req.params.id);
    },
    eliminar: (req,res) =>{
        let indiceDelProducto
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                indiceDelProducto = productos.indexOf(producto); 
            }           
        });
        productos.splice(indiceDelProducto, 1);
       //transformo mi db a Json
     let productosJson = JSON.stringify(productos); 
     //sobre escribo mi json de productos con un nuevo json que contiene el nuevo producto
     fs.writeFileSync(path.join(__dirname, '..','data','productos.json'), productosJson);
     res.redirect('/products');
    }

   
}