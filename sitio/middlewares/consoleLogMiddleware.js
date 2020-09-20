let mw = (req, res, next) =>{
    console.log('pasando por el nivel aplicacion')
    next();
  }

  module.exports = mw;