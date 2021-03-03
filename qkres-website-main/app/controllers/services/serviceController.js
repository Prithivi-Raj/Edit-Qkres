const dotenv = require("dotenv");
dotenv.config();
const Service = require("../../models/service")
const Material = require("../../models/materials")
const moment = require("moment");
const aws = require("aws-sdk");
const validator = require("validator")
const {validationResult}= require("express-validator")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.S_EMAILAPI);
aws.config.update({
    region:process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY
})



function serviceController(){
    return{
        getSignedRequest(req,res){
          const userId = req.user._id ;
            const s3 = new aws.S3();
            let fileName = req.query['file-name'];
            const fileType = req.query['file-type'];
            var ext = fileName.split('.').pop();
            var random = Math.floor(Math.random() * 90000000000000);
        
            fileName = random + '.' + fileName ;
            let s3Params = {
                Bucket: process.env.AWS_BUCKETNAME,
                Fields:{
                  key: fileName,
                  acl:"private"
                }, 
                Expires: 200,
                Conditions:[
                  {"acl":'private'},
                  ['starts-with', '$Content-Type', 'application/pdf'],
                  ["content-length-range",1,15360000]
                ],
                ContentType :"application/pdf"
              };
              s3.createPresignedPost(s3Params,(err,data)=>{
                if(err){
                    console.log(err);
                    return res.end();
                  }
                  const returnData ={
                    signedRequest: data,
                    url:`https://${process.env.AWS_BUCKETNAME}.s3.amazonaws.com/${fileName}`,
                    name:fileName
                  };
                  // console.log(returnData);
                  res.write(JSON.stringify(returnData));
                  res.end();

              });
            
        },
       serviceFormInputs(req,res){
        

          const user = req.user;
          const errors = validationResult(req) 
        
          let {Itemid,serviceName,customerName,phone,email,department,
            insti,requirement,file,url,country,state,
            city,pincode,landmark,address} = req.body
           
            const str = url;
            const extFileName = str.slice(46,)
            console.log(extFileName);
           
            const s3 = new aws.S3();

            const params = {
                    Bucket:process.env.AWS_BUCKETNAME ,
                    Key: extFileName //if any sub folder-> path/of/the/folder.ext
            }
            async function deleteObject(){
              try {
                await s3.headObject(params).promise()
                console.log("File Found in S3")
                try {
                  await s3.deleteObject(params).promise()
                  console.log("file deleted Successfully")
              }
              catch (err) {
                   console.log("ERROR in file Deleting : " + JSON.stringify(err))
              }
                
              } catch (error) {
                console.log("File not Found ERROR : " + err.code)
                // return res.redirect("/error")
              }
             }
             if(!errors.isEmpty()){
              deleteObject();
              console.log(errors);
              req.flash("error","Validation failed, try again")
              return res.redirect(`/mech/${Itemid}`) ;
            }
       
            if(validator.isEmpty(Itemid)){
              deleteObject();
              return res.redirect("/error")
            }
       
          Material.findById(Itemid,function(err,success){
              console.log(success);
               if(err){
                deleteObject();
                req.flash("error","Validation failed, try again")
                return res.redirect("/error") ;
               }
               if(validator.isEmpty(serviceName)){
                deleteObject();
                req.flash("error","Validation failed, try again")
                return res.redirect(`/mech/${Itemid}`) ;
              }
              if(serviceName.toString() != success.name.toString()){
                deleteObject();
                req.flash("error","Validation failed, try again")
                return res.redirect(`/mech/${Itemid}`) ;
              }
             })

           s3.headObject(params,function (err,response) {
              if(err){
                console.log(err);
              req.flash("error","Invalid file upload, try again");
              return res.redirect(`/mech/${Itemid}`) ;
               
              }
              console.log(response);
            })
         if(validator.isEmpty(email)){
          req.flash("error","Please Enter Email address")
          return res.redirect(`/mech/${Itemid}`) ;
        }
        if(!validator.isEmail(email)){
          req.flash("error","Please Enter valid Email address")
          return res.redirect(`/mech/${Itemid}`) ;
        }
        // check('email').isEmail().normalizeEmail()
  
         const service = new Service({
          scustomerId : user.id,
          serviceName:serviceName,
          filePath:url,
          requirement:requirement,
          name:customerName,
          email:email,
          city:city,
          department:department,
          insti:insti,
          address:address,
          pincode:pincode,
          phone:phone,
          landmark:landmark,
          country:country,
          state:state
        })
        
        service.save().then(service => {
          Service.populate(service,{path:"scustomerId"},(err,serviceOrderPlaced)=>{
            const eventEmitter =req.app.get("eventEmitter")
            eventEmitter.emit("serviceOrderPlaced",serviceOrderPlaced)
            const mailOptions = {
              to:user.google.email || user.local.email,
              from: process.env.FROM_EMAIL,
              templateId:'d-d657d3f709284f9487cd1dd20c7200d3'
            }
            sgMail.send(mailOptions,function(err,result){
              
                if(err) {
                  console.log(err)
                  return res.status(500).json({
                    message: err.message
                  });
                }else{
                  return res.redirect("/customer/serviceOrders") 
                }
                
          
            });
          })
        }).catch(err=>{
          console.log(err);
          req.flash("error","something went wrong")
          return res.redirect(`/mech/${Itemid}`)
        })
        },
       async index(req,res){
          const services = await Service.find({scustomerId:req.user._id},
            null,
            {sort:{"createdAt": -1}})
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
          res.render("customer/services/service",{service:services,moment:moment})
        },
        async show(req,res){
          const service = await Service.findById(req.params.id)
          if(req.user._id.toString() === service.scustomerId.toString() ){
                  return  res.render("customer/services/singleService",{service})
          }else{
            return res.redirect("/customer/services/service")
          }
        }
        
    }
}
module.exports = serviceController