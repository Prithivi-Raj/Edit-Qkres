const guest = require("../app/middleware/guest")
const adminAuth=require("../app/middleware/admin")
const secure = require("../app/middleware/auth")
const adminProfile = require("../app/middleware/adminRedirect")
const verify = require("../app/middleware/userInputValidation");
const verify_user = require("../app/middleware/userInputValidation2");
const redirect = require("../app/controllers/redirectController")
const order = require("../app/controllers/orderController")
const auth = require("../app/controllers/authController")
const cart = require("../app/controllers/cartController")
const material = require("../app/controllers/materialController")
const homePage = require("../app/controllers/homeController")
const adminOrder=require("../app/controllers/adminController")
const forgotPassword = require("../app/controllers/passwordResetController")
const chemical = require("../app/controllers/chemicals/chemicalController")
const statusController = require("../app/controllers/statusController")
const cancelRequest = require("../app/controllers/cancelOrderRequest/oCancelController")
const services = require("../app/controllers/services/serviceController")
const fileDownloadController = require("../app/controllers/fileDownloadController")
const passport = require("passport");
const { check } = require('express-validator');
const RateLimit = require("express-rate-limit");
var MongoStore = require('rate-limit-mongo');
var limiter = new RateLimit({
  store: new MongoStore({
    uri:process.env.URL,
    collectionName:"loginRecordRates",
    expireTimeMs:7200000
  }),
  max: 5,
  windowMs: 15 * 60 * 1000,
  message:
  "We detected suspicious activity from this IP, please try again after two hours"
});
var passwordResetLimiter = new RateLimit({
  store:new MongoStore({
    uri:process.env.URL,
    collectionName:"passwordResetRateRecords",
    expireTimeMs:1800000
  }),
  max: 3,
  windowMs:10 * 60 * 1000,
  message:"we detected multiple requests from this IP, please try again after 30 mins"
})

function initRoutes(app) {

  app.get("/", homePage().index)

// ***************** ELEC EQUIPMENTS *********************

  app.get("/electrical-lab-equipments",material().elecHome)

  app.get("/electrical-lab-equipments/dc-power-supply",material().dc)

  app.get("/electrical-lab-equipments/demonstration-modules",material().demo)

  app.get("/electrical-lab-equipments/digital-multimeter",material().dmulti)

  app.get("/electrical-lab-equipments/digital-storage-oscilloscope",material().dso)

  app.get("/electrical-lab-equipments/electric-training-modules",material().etm)

  app.get("/electrical-lab-equipments/digital-meter",material().dm)

  app.get("/electrical-lab-equipments/digital-ohmmeter",material().digiohm)

  app.get("/electrical-lab-equipments/oscilloscope",material().oscilloscope)

  app.get("/electrical-lab-equipments/electric-training-board",material().etb)

  app.get("/electrical-lab-equipments/portable-typemeter",material().typemeter)

  app.get("/electrical-lab-equipments/decade-box",material().decade)

  app.get("/electrical-lab-equipments/other",material().other)

// mech services routes
  app.get("/mechanical-services",material().mech)

  app.get("/mech/:token",secure,material().mechForm)
  

  app.get("/sign-s3",secure,services().getSignedRequest)

  app.get("/chemicals",material().chemIndex)


app.get("/business-opportunities",material().bsOpp)

// cart routes 

  app.get("/cart", cart().index)

  app.get("/delete-cart",secure,cart().delete_cart)

  app.get("/userDetails",secure,cart().userInfo)

  app.post("/update-cart", cart().update)

  app.post("/delete-items",secure,cart().delete_items_in_cart)

  app.post("/add-items",secure,cart().add_items_to_cart)

 // local routes

 app.get("/register",guest, auth().register)

app.get("/profile",adminProfile,auth().profile)

  app.post("/register",passport.authenticate("local-signup",{
    successRedirect:"/login",
    failureRedirect:"/register",
    failureFlash : true
  }))

  app.get("/login",guest, auth().login)
  app.post("/login",limiter,passport.authenticate("local-login",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    failureFlash : true
  }))
  app.get("/logout",auth().logout)

  // third party authentication


app.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }))


  app.get("/auth/google/qkres",passport.authenticate("google", {
           successRedirect: "/profile",
           failureRedirect: "/register"
       }))



app.get("/auth/facebook",passport.authenticate("facebook", { scope: ["public_profile", "email"] }))

app.get("/auth/facebook/callback",passport.authenticate("facebook", {
         successRedirect: "/profile",
         failureRedirect: "/register"
     }))


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

app.get('/connect/local',secure,function(req, res) {
  res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});
app.post('/connect/local',secure, passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


  // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

////////////////// deactivate ///////////////////////////////////////////////

            app.get('/unlink/local', function(req, res) {
              var user            = req.user;
              user.local.email    = undefined;
              user.local.password = undefined;
              user.save(function(err) {
                  res.redirect('/profile');
              });
          });


          app.get('/unlink/google', function(req, res) {
            var user          = req.user;
            user.google.googleToken = undefined;
            user.save(function(err) {
               res.redirect('/profile');
            });
        });

// customer routes for materials
  app.post("/orders",verify_user,secure,order().store)
app.get("/customer/orders",secure,order().index)
app.get("/customer/order/:id",secure,order().show)
// customer routes for services
app.post("/qkres-services-form",verify,secure,services().serviceFormInputs)
app.get("/customer/serviceOrders",secure,services().index)
app.get("/customer/serviceOrder/:id",secure,services().show)

app.get("/qkres-sitemap",homePage().sitemap)
// cancel order request routes
app.post("/cancel-order-request",secure,cancelRequest().index)

// admin routes

app.get("/admin/orders",adminAuth,adminOrder().index)

app.get("/admin/services",adminAuth,adminOrder().serviceIndex)

app.post("/admin/order/status",adminAuth,statusController().update)

app.post("/admin/serviceOrder/status",adminAuth,statusController().serviceUpdate)

app.get("/admin/file/:fileName",adminAuth,fileDownloadController().index)

app.post("/admin/order/cancel",adminAuth,statusController().cancel)

app.get("/admin/profile",adminAuth,adminOrder().adminProfile)

//  password recovery routes

app.get("/reset",forgotPassword().reset)

app.post("/reset",passwordResetLimiter,forgotPassword().recover)

app.get("/success",forgotPassword().success)

app.get("/forgot/:token",forgotPassword().afteremail)

app.post("/forgot/:token",forgotPassword().newEntries)


app.get("/about-us",homePage().aboutUs)

// manufacturing and fabrication routes

app.get("/manufacturing-and-fabrication",material().mnf)

app.get("/welding-services/:id",secure,material().weldingForm)

app.get("/electrical-discharge-machining-services/edm-services/:id",secure,material().edmForm)

app.get("/water-jet-machining-services/:id",secure,material().wjmForm)

app.get("/computer-numerical-control-services/cnc-services/:id",secure,material().cncForm)

app.get("/casting-services/:id",secure,material().castingForm)

app.get("/laser-cut-machining-services/:id",secure,material().lcmForm)

app.get("/diamond-laser-cutting-services/:id",secure,material().dlcForm)

// 3-d printing routes

app.get("/3d-printing",material().threedprinting)
app.get("/3d-printing/form/:token",secure,material().tdpForm)

// consultancy routes

app.get("/consultancy",material().consultancy)
app.get("/consultancy-services/form/:token",secure,material().consultForm)
// chemical equipments routes

app.get("/chemical-lab-equipments",material().chemEquip)
 
// mechanical-instruments

app.get("/mechanical-instruments",material().mechInst)


// redirects

app.get("/home",redirect().homePage)
app.get("/facilities-services/consultancy",redirect().consultancy)
app.get("/facilities-services/manufacturing-fabrication",redirect().mnf)
app.get("/material-resources/chemicals",redirect().chemical)
app.get("/material-resources/electrical-resources",redirect().elec)
app.get("/facilities-services/3d-printing",redirect().threeD)
app.get("/material-resources/mechanical-resources",redirect().mech)
 // robots
 app.get('/robots.txt',homePage().robots)



}











module.exports = initRoutes
