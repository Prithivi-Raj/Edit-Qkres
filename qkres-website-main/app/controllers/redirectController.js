
function redirectController(){
    return{
        homePage(req,res){
            return res.redirect("/")
        },
        consultancy(req,res){
            return res.redirect("/consultancy")
        },
        mnf(req,res){
            return res.redirect("/manufacturing-and-fabrication")
        },
        chemical(req,res){
            return res.redirect("/chemicals")
        },
        elec(req,res){
            return res.redirect("/electrical-lab-equipments")
        },
        threeD(req,res){
            return res.redirect("/3d-printing")
        },
        mech(req,res){
            return res.redirect("/mechanical-services")
        }

    }
}

module.exports = redirectController