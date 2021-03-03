function service(req,res,next){
    if(req.isAuthenticated() && req.file){
        return next()
    }
    return res.redirect("mech/:token")
}