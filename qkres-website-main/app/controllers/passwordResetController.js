const User = require("../models/users")
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcrypt")
sgMail.setApiKey(process.env.S_EMAILAPI);



function resetPassword() {
  return {
    reset(req, res) {
      res.render("forgotPassword/reset")
    },
    success(req, res) {
      res.render("forgotPassword/success")
    },
    forgot(req, res) {
      res.render("forgotPassword/forgot")
    },
    recover(req, res) {
      User.findOne({
          "local.email": req.body.email
        })
        .then(user => {
          if (!user) {
            req.flash("error", "No user found")
            res.redirect("/reset")
          }
    
          user.generatePasswordReset();

          // Save the updated user object
          user.save()
            .then(user => {
              // send email
              let link = "https://" + req.headers.host + "/forgot/" + user.local.passwordResetToken;
              const mailOptions = {
                to: user.local.email,
                from: process.env.FROM_EMAIL,
                subject: "Password change request",
                templateId:'d-37771ee038c34b289d4711617f09c2ad',
                dynamic_template_data:{
                  reset_url : link
                }
              };
              sgMail.send(mailOptions,(err,result)=>{
                if(err){
                  console.log(err);
                }
                else{
                  res.redirect("/success")
                }

              })

            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: err.message
              })
            });
        })
        .catch(err => res.status(500).json({
          message: err.message
        }));

    },
    afteremail(req, res) {
      User.findOne({
          "local.passwordResetToken":  req.params.token,
          "local.passwordResetExpires": {
            $gt: Date.now()
          }
        })
        .then((user) => {
          console.log(user);
         
          if (!user) {
            return res.status(401).json({
              message: 'Password reset token is invalid or has expired.'
            });
          }

          res.render('forgotPassword/forgot', {
            user
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: err.message
          })
        });
    },
     newEntries(req,res){
       console.log(req.params.token);
       User.findOne({
         "local.passwordResetToken": req.params.token,
         "local.passwordResetExpires": {$gt: Date.now()} })
        .then((user) => {
          console.log(user);
            if (!user) {
              return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
            }
            //Set the new password
            user.local.password = user.generateHash(req.body.password);
            user.local.passwordResetToken = undefined;
            user.local.passwordResetExpires = undefined;

            // Save
            user.save(err => {
              if (err)
                return res.status(500).json({ message: err.message });

              // send email
              const mailOptions = {
                to: user.local.email,
                from: process.env.FROM_EMAIL,
                subject: "Your password has been changed",
                templateId:'d-c729895f180f4fa9af14ca48f3be863e',
              };

              sgMail.send(mailOptions, (error, result) => {
                if (error)
                  return res.status(500).json({ message: error.message });
      
                res.redirect("/login");
              });
            });
          }).catch(err=>{
            console.log(err);
          })

     }


























  }
}

module.exports = resetPassword
