const Material = require("../models/materials")
const path = require("path")

function homePage(){
  return {
    index(req,res){
      res.render("index")
    },
    aboutUs(req,res){
      res.render("About")
    },
    mnf(req,res){
      res.render("manufacturing")
    },
    sitemap(req,res){
      res.sendFile("sitemap.xml",{root:"./"})
    },
    robots(req,res){
      res.sendFile("robots.txt",{root:"./"})
    }

  }
}

module.exports = homePage
