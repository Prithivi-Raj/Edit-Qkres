const User = require("../models/users")
const bcrypt = require("bcrypt");
const passport = require("passport");


function authController() {

  function _getRedirectUrl(req){
    return req.user.role==="admin"?"/admin/orders":"/"
  }

  return {
    register(req, res) {
      res.render("signup")
    },
    login(req, res) {
      res.render("signin")
    },
    profile(req,res){
      res.render("customer/profile")
    },
    postRegister(req, res) {

      const customerName = req.body.customerName;
      const email = req.body.email;
      const password = req.body.password;

      // validate request
      if (!customerName || !email || !password) {
        req.flash("error", "All fields are required")
        req.flash("customerName", customerName)
        req.flash("email", email)
        return res.redirect("/register")
      }
      // check if email exist
      User.findOne({
        "local.email": email
      },  function(err, result) {
        if (result) {
          req.flash("error", "This email is already taken")
          req.flash("customerName", customerName)
          req.flash('email', email)
          return res.redirect("/register")
        } else {
        
            const user = new User()
            user.local.customerName=customerName
            user.local.email=email
            user.local.password= password
            
           

            user.save().then(function(user) {
              // login
              // console.log("check chey bro")
              return res.redirect("/login")
            }).catch(err => {
              console.log(err);
              req.flash("error", "Something went wrong")
              return res.redirect("/register")

            })

        }
      })
    },
    postLogin(req,res,next){
      const email= req.body.email;
      const password = req.body.password;
      // validate request
      if (!email|| !password) {
        req.flash("error", "All fields are required")
        return res.redirect("/login")
      }
   passport.authenticate("local-login",(err,user,info)=>{
     if(err){
         req.flash("error",info.message)
         return next(err)
     }
     if(!user){
         req.flash("error",info.message)
         return res.redirect("/login")
     }
     req.logIn(user,(err)=>{
         if(err){
             req.flash("error",info.message)
             return next(err)
         }
         return res.redirect(_getRedirectUrl(req))
     })

   })(req,res,next)
 },
 logout(req,res){
   req.logout()
   return res.redirect("/")
 }




  }
}

module.exports = authController
