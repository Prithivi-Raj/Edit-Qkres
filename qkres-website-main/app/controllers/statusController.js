const Order = require("../models/order")

const sgMail = require('@sendgrid/mail');
const Service = require("../models/service");

sgMail.setApiKey(process.env.S_EMAILAPI);

function statusController(){
return{
    update(req,res){
        Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                if(err){
                   return console.log(err);
                }
                else{
                    Order.findById(req.body.orderId,function(err,order){
                        const mail = order.uEmail;
                        const name = order.name;
                        const status = order.status;
                        console.log(order.customerId);
                        const mailOptions = {
                            to:mail,
                            from: process.env.FROM_EMAIL,
                            subject: req.body.status,
                           templateId:'d-7bd8639530174bef9bdb2ee5493ba0f0',
                           dynamic_template_data:{
                            order_update : status
                          }
                          };
                          sgMail.send(mailOptions, (error, result) => {
                            if (error) {
                              return res.status(500).json({
                                message: error.message
                              });
                            }
                          });
                    })

                    const eventEmitter =req.app.get("eventEmitter")
                    eventEmitter.emit("orderUpdated",{id:req.body.orderId,status:req.body.status})
               return res.redirect("/admin/orders")
                }
               
  
        })

    },
    serviceUpdate(req,res){
      Service.updateOne({_id:req.body.serviceOrderId},{status:req.body.status},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          Service.findOne({_id:req.body.serviceOrderId},(err,service)=>{
            const mail = service.email ;
            const mailOptions = {
              to:mail,
              from: process.env.FROM_EMAIL,
             templateId:'d-7bd8639530174bef9bdb2ee5493ba0f0',
             dynamic_template_data:{
              order_update : req.body.status
            }
            };
            sgMail.send(mailOptions, (error, result) => {
              if (error) {
                return res.status(500).json({
                  message: error.message
                });
              }
            });
          })
                    const eventEmitter =req.app.get("eventEmitter")
                    eventEmitter.emit("serviceOrderUpdated",{id:req.body.serviceOrderId,status:req.body.status})
                    return res.redirect("/admin/services")
        }
      })

    },
    cancel(req,res){
      Order.updateOne({_id:req.body.orderId},{status:"completed"},(err,data)=>{
        if(err){
          return console.log(err);
        }else{
          Order.updateOne({_id:req.body.orderId},{message:"Order cancellalation approved"},function(err,order){
            if (err){
              console.log(err);

            }
            console.log(order.customerId);
 
        })
        return res.redirect("/admin/orders")
        }
      })

    }
}
}


module.exports = statusController


// const mailOptions = {
//   to:mail,
//   from: process.env.FROM_EMAIL,
//   subject: req.body.status,
//   text: `Hi ${name} \n
//   Your order  has been Cancelled \n\n
//   Order Status : ${status}\n`,
// };
// sgMail.send(mailOptions, (error, result) => {
//   if (error) {
//     return res.status(500).json({
//       message: error.message
//     });
//   }
// });