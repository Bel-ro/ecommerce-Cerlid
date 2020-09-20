function admiMw(req, res, next){
    if(user.admin == true){
        next()
    }else {
        res.render('home')
    }
}
module.exports = admiMw;