require("dotenv").config();
const passport = require("passport")
const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/users");
const key = require("./keys")
const {check} = require("express-validator")
const validator = require("validator")




function init(passport) {
  // passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })



  passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",

  }, async (email, password, done) => {
    if(!validator.isEmail(email)){
      return done(null, false, req.flash("error","invalid email address"));
    }
    await User.findOne({
     "local.email": email
    }, function(err, user) {
      if (!user) {
        return done(null, false, {
          message: "No user found with this email"
        })
      }

      bcrypt.compare(password, user.local.password).then(match => {

        if (match) {
          return done(null, user, {
            message: "logged in"
          })
        }

        return done(null, false, {
          message: "Wrong email or password"
        })


      }).catch(err => {
        return done(null, false, {
          message: "Something Went wrong"
        })

      })

    })

  }));

     // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        if(!req.user) {
        
          User.findOne({'local.email': email}, function(err, user) {
          if(err) {
            console.error(err);
            return done(err);
            }
          if(user) {
            return done(null, false, req.flash("error","Oops,this Email already exists"));
          }
          else {
              if(!validator.isEmail(email)){
                return done(null, false, req.flash("error","invalid email address"));
              }
              if(validator.isEmpty(req.body.customerName)){
                return done(null, false, req.flash("error","validation failed"));
              }
              if(validator.isNumeric(req.body.customerName)){
               return done(null, false, req.flash("error","Numeric string are not allowed"));
              }
              if(!check(password).isLength({min:8})){
                return done(null, false, req.flash("error","password validation failed"));
              }

              var newUser = new User();
              newUser.local.customerName = req.body.customerName;
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              newUser.save(function(err) {
                if(err) {
                  if(err.message == 'User validation failed') {
                    return done(null, false, req.flash("error","All feilds are required!"));
                  }
                  console.error(err);
                  return done(err);
                  }
                return done(null, newUser);
              });
            }
        });
      }
      else {//user exists and is loggedin
        var user = req.user; // pull the user out of the session
        // update the current users local credentials
        user.local.customerName = req.body.customerName;
        user.local.email = email;
        user.local.password = user.generateHash(password);
        // save modifications to user
        user.save(function(err) {
          if (err) {
            console.error(err);
            return done(err);
          }
          return done(null, user);
        });
      }
    });
  }));

      // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(
      new GoogleStrategy({
              clientID: key.googleAuth.clientID,
              clientSecret: key.googleAuth.clientSecret,
              callbackURL: key.googleAuth.callbackURL,
              passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
          },
          (req, token,refreshToken, profile, done) => {
            console.log(profile);
          // asynchronous
          process.nextTick(function () {
            // check if the user is already logged in
            if (!req.user) {
              User.findOne({ "google.googleId": profile.id }, function (err, user) {
                if (err)
                  return done(err);

                if (user) {
                  // if there is a user id already but no token (user was linked at one point and then removed)
                  if (!user.google.googleToken) {
                    user.google.googleToken = token;
                    user.google.customerName = profile.displayName;
                    user.google.email = profile.emails[0].value; // pull the first email

                    user.save(function (err) {
                      if (err)
                        throw err;
                      return done(null, user);
                    });
                  }

                  return done(null, user);
                } else {
                  var newUser = new User();
                  newUser.google.googleId = profile.id;
                  newUser.google.googleToken = token;
                  newUser.google.customerName = profile.displayName;
                  newUser.google.email = profile.emails[0].value; // pull the first email

                  newUser.save(function (err) {
                    if (err)
                      throw err;
                    return done(null, newUser);
                  });
                }
              });
            } else {
              // user already exists and is logged in, we have to link accounts
              var user = req.user; // pull the user out of the session

              user.google.googleId = profile.id;
              user.google.googleToken = token;
              user.google.customerName = profile.displayName;
              user.google.email = profile.emails[0].value; // pull the first email

              user.save(function (err) {
                if (err)
                  throw err;
                return done(null, user);
              });
            }
          });
        }
      )
  );























  // passport.use(new FacebookStrategy({
  //     clientID: key.facebookAuth.clientID,
  //     clientSecret: key.facebookAuth.clientSecret,
  //     callbackURL: key.facebookAuth.callbackURL
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     console.log(profile);
  //     User.findOrCreate({
  //       facebookId: profile.id,
  //       customerName:profile.displayName

  //     }, function(err, user) {
  //       if (err) { return done(err); }
  //       done(null, user);
  //     });
  //   }
  // ));












}

module.exports = init
