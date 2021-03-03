const Order = require("../../models/order")
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.S_EMAILAPI);

function oCancelController(){
    return{

 index(req,res){
   Order.updateOne({_id:req.body.id},{message:req.body.cancelInput},(err,data)=>{
     if(err){
       console.log(err);
       return res.redirect("/error")
     }else{
       return res.redirect("/customer/orders")
     }
   })
 }
 // end of index method




                 }
              
                 

            }





module.exports = oCancelController