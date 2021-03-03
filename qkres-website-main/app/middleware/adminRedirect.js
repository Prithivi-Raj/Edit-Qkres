function adminRedirect(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role==="admin"){
            return res.redirect("/admin/profile")
        }
      return next()
    }
    return res.redirect("/")
  }
  
  module.exports=adminRedirect