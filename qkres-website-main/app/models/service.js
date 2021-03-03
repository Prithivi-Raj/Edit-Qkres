const mongoose = require("mongoose")
const User = require("./users")

const serviceSchema = new mongoose.Schema({
    scustomerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    },
    name:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String,required:true},
    insti:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    pincode:{type:String,required:true},
    phone:{type:String,required:true},
    landmark:{type:String,required:true},
    country:{type:String,required:true},
    state:{type:String,required:true},
    status:{type:String,default:"order_placed"}
},{timestamps:true})

const Service = mongoose.model("Service",serviceSchema,"services")

module.exports = Service