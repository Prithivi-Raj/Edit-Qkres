const Material = require("../models/materials")


function materialController(){
  return{
    elecHome(req,res){
      Material.find({"identity":"elec_home"},(err,elecs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("elec",{elec:elecs})
        }
      })
    },
    mech(req,res){
      Material.find({"identity":"mech"},(err,mechs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("mech",{mech:mechs})
        }
      })
    },
    dc(req,res){
      Material.find({"identity":"DC POWER SUPPLY"},(err,dcs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:dcs,header:"Dc Power Supply"})
        }
      })
    },
    demo(req,res){
      Material.find({"identity":"DEMONSTRATION MODELS"},(err,demos)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:demos,header:"Demonstration modules"})
        }
      })
    },
    dmulti(req,res){
      Material.find({"identity":"DIGITAL MULTIMETER"},(err,dmultis)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:dmultis,header:"Digital Multimeter"})
        }
      })
    },
    dso(req,res){
      Material.find({"identity":"DIGITAL STORAGE OSCILLOSCOPE"},(err,dsos)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:dsos,header:"Digital Storage Oscillope"})
        }
      })
    },
    etm(req,res){
      Material.find({"identity":"ELECTRONIC TRAINING MODULES"},(err,etms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:etms,header:"Electronic Training Modules"})
        }
      })
    },
    dm(req,res){
      Material.find({"identity":"DIGITAL METER"},(err,dms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:dms,header:"Digital Meter"})
        }
      })
    },
    digiohm(req,res){
      Material.find({"identity":"DIGITAL OHM METER"},(err,digiohms)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:digiohms,header:"Digital Ohm Meter"})
        }
      })
    },
    oscilloscope(req,res){
      Material.find({"identity":"OSCILLOSCOPE"},(err,oscilloscopes)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:oscilloscopes,header:"Oscilloscope"})
        }
      })
    },
    etb(req,res){
      Material.find({"identity":"ELECTRONIC TRAINING BOARD"},(err,etbs)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:etbs,header:"Electronic Training Board"})
        }
      })
    },
    typemeter(req,res){
      Material.find({"identity":"PORTABLE TYPE METER"},(err,typemeters)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:typemeters,header:"Portable Type Meter"})
        }
      })
    },
    decade(req,res){
      Material.find({"identity":"DECADE BOX"},(err,decades)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:decades,header:"Decade Box"})
        }
      })
    },
    other(req,res){
      Material.find({"identity":"Other products"},(err,others)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("electricals/elecComponents",{data:others,header:"Some important Electrical Equipments"})
        }
      })
    },
    mechForm(req,res){
       Material.find({"_id":req.params.token},(err,data)=>{
         if(err){
           console.log(err);
         }else{
           return  res.render("servicesForm/mechServices",{data:data})
         }
       })
      // res.render("servicesForm/mechService")

    },
    chemIndex(req,res){
      Material.find({"identity":"chemicals"},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("chemicals/chemicals",{data:data})
        }
      })
      
    },
    mnf(req,res){
     Material.find({"identity":"mnf_home"},(err,data)=>{
       if(err){
         console.log(err);
       }else{
         return res.render("manufacturing",{data:data})
       }
     })
    },
    weldingForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    edmForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    wjmForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    cncForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    castingForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    lcmForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    dlcForm(req,res){
      Material.find({"_id":req.params.id},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    threedprinting(req,res){
     Material.findOne({"identity":"3d-printing"},(err,data)=>{
       if(err){
         console.log(err);
       }else{
         return res.render("3d-printing",{data:data})
       }
     })
    },
    tdpForm(req,res){
      Material.find({"_id":req.params.token},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    consultancy(req,res){
      Material.findOne({"identity":"consultancy"},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("consultancy",{data:data})
        }
      })
    },
    consultForm(req,res){
      Material.find({"_id":req.params.token},(err,data)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("servicesForm/mechServices",{data:data})
        }
      })
    },
    chemEquip(req,res){
      return res.render("chemicals/chem_lab_equipments")
    },
    bsOpp(req,res){
     return res.render("bSoPP")
    },
    mechInst(req,res){
      return res.render('mechanical/mechanical-equipments')
    }

  }
}


module.exports =materialController
