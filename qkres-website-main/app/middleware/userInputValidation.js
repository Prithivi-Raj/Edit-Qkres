const { check } = require('express-validator');


var x = [
    check('customerName', 'Name length should be atleast 3 characters') 
    .isLength({ min: 3}).blacklist('\\[\\]').escape(),
    check('phone', 'Mobile number should contains 10 digits').isNumeric() 
    .isLength({ min: 10, max: 10 }),
    check('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
    check('requirement',"Invalid text format should not be accepted").isLength({min:1}).isString().blacklist('\\[\\]').escape(),
    check('pincode',"Pincode should be numeric").isNumeric().blacklist('\\[\\]').escape(),
    check('country','country name should be string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('state','state name should be of type string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('city','city name should be of type string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('address','address should be of type string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('Itemid','item id should not be modified').isString().isLength({min:24,max:24}).blacklist('\\[\\]').escape()

  ]


  module.exports = x