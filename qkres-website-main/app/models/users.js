const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate=require("mongoose-findorcreate")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
 
  role:{
    type:String,
    default:"customer"
  },
  local:{
    customerName: {
        type: String
      },
      email: {
        type: String,
      },
      password: {
        type: String
      },
      passwordResetToken: String,
      passwordResetExpires: Date
  },
 
  google:{
    googleId: {
        type: String
      },
      googleToken: {
        type: String
      },
      customerName:{
          type:String
      },
      email:{
          type:String
      }
  }



}, {
  timestamps: true
})





// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null);
};

// checking if password is valid
// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };








    



// userSchema.methods.generateJWT = function() {
  
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);
//     let payload = {
//     id: user._id,
//     email: user.local.email,
//     customerName: user.local.customerName,

// };

// return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
// });
// };

userSchema.methods.generatePasswordReset = function() {
  user=this
    user.local.passwordResetToken = crypto.randomBytes(32).toString('hex');
    user.local.passwordResetExpires = Date.now() + 3600000; //expires in an hour
};
mongoose.set('useFindAndModify', false);

// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model("User",userSchema)


module.exports=User
