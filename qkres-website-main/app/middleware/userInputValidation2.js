const { check } = require('express-validator');

var y =[
    check('name', 'Name length should be atleast 3 characters') 
    .isLength({ min: 3}).blacklist('\\[\\]').escape(),
    check('phone', 'Mobile number should contains 10 digits').isNumeric() 
    .isLength({ min: 10, max: 10 }),
    check('city','city name should be string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('address','address name should be string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('landmark','landmark name should be string').isString().isLength({min:2}).blacklist('\\[\\]').escape(),
    check('pincode',"Pincode should be numeric").isNumeric().blacklist('\\[\\]').escape(),
    check('uEmail', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
]
module.exports=y