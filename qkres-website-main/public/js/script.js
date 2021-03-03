let data = [
    {
        "identity": "Chem-equip",
        "category ": "BEAKERS ",
        "description ": "BEAKERS LOW FORM WITH SPOUT DB GR. ",
        "img": "/images/chemEquipments/img/glass-beaker-500x500.jpg"

    },
    {
        "identity": "Chem-equip",
        "category ": "QUARTZ WARE ",
        "description ": "BEAKER QUARTZ LOW FORM WITH SPOUT",
        "img":"/images/chemEquipments/img/quartz.jpg"
    },

    {
        "identity": "Chem-equip",
        "category ": "BOTTLES",
        "description ": "BOTTLES ASPIRATOR OUTLET TUBING 250 ML ",
        "img":"/images/chemEquipments/img/2-5litre-chemical-bottle-500x500.jpg"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "BURETTES",
        "description ": "BURETTES BOROFL STCK 'A' NABL CER. 10 ML ",
        "img":"/images/chemEquipments/img/burette.jpg"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "CYLINDER",
        "description ": "CYLD: WITH POUR OUT NABL CER. 5ML ",
        "img": "/images/chemEquipments/img/Glass_cylinder_32854.jpg"
    },
    
    {
        "identity": "Chem-equip",
        "category ":  "FLASK",
        "description ": "VOLUMETRIC FLASK NABL CER. 1 ML ",
        "img":"/images/chemEquipments/img/flask.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "PIPETTES ",
        "description ": "PIPETTES MOHR 'A' NABL CER. 0.1 ML ",
        "img":"/images/chemEquipments/img/pippete.jfif"
    },
    
    
    {
        "identity": "Chem-equip",
        "category ": "CONDENSERS ",
        "description ": "LIEBIG CONDENSER PLAIN 200 MM ",
        "img":"/images/chemEquipments/img/condensers.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "DESICCATORS ",
        "description ": "DES. SET WITH PLASTIC KNOB 100 MM ",
        "img":"/images/chemEquipments/img/dessicators.jfif"
    },
   
    {
        "identity": "Chem-equip",
        "category ": "DISHES ",
        "description ": "CRYSTALLIZING DISHES 100 X 50 MM ",
        "img":"/images/chemEquipments/img/dishes.jfif"
    },
    
    
    {
        "identity": "Chem-equip",
        "category ": "DISTILLING APPARATUS ",
        "description ": "DISTILLING APPRATUS I/C JT 500 ML ",
        "img":"/images/chemEquipments/img/distilling.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "FILTRATION ASSEMBLY ",
        "description ": "ALL GLASS FILTRATION ASSEMBLY 90MM, 5 L ",
        "img":"/images/chemEquipments/img/filteration.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "COLUMNS ",
        "description ": "CHROMATOGRAPHY COLUMN PLAIN STCK 200 MM ",
        "img":"/images/chemEquipments/img/columns.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "FUNNELS ",
        "description ": "FUNNELS POWDER SHORT STEM 125 MM ",
        "img":"/images/chemEquipments/img/funnel.jfif"
    },
   
    {
        "identity": "Chem-equip",
        "category ": "JARS ",
        "description ": "MUSEUM JARS RECTANGLR 200 X 125 X 125 MM ",
        "img":"/images/chemEquipments/img/jars.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "TEST TUBES ",
        "description ": "TEST TUBES: WITH RIM 10 X 75 MM ",
        "img":"/images/chemEquipments/img/testtube.jfif"
    },

    
    {
        "identity": "Chem-equip",
        "category ": "LabQuest ",
        "description ": "DAPS-ELECTRONIC RELAY UNIT FOR 3363 5 L ",
        "img":"/images/chemEquipments/img/labquest.jfif"
    },
    
    {
        "identity": "Chem-equip",
        "category ": "VIALS ",
        "description ": "9-2ML SCW CLR VI 'B' BD SLT PTFE SLCNE WITH WRITING PATCH ",
        "img":"/images/chemEquipments/img/vials.jfif"
    }
]



console.log(data)
let items = data.map((product) => {
return(
`<div  class="col-12 col-sm-4">
<div class="card">
    <div class="card-img">
        <img class=${product.img} data-src="/images/chemEquipments/img/Spinner-1s-200px.svg" />
    </div>
    <div class="class-body text-center">
        <h4 class="card-title" style="margin: 5%;">
            ${product["category "]}
        </h4>
        <p class="card-text">
            ${product["description "]}
        </p>
        <button class="btn" onclick="location.href='https://docs.google.com/forms/d/e/1FAIpQLSfBhfwFk7biQaw528AqiQocHal9-Y4O-k6gPmyU1JXXWp_sfg/viewform?usp=send_form'">
           <h4>ORDER NOW</h4>
        </button>
        
    </div>
</div>
</div>`
)
});

let s = "";
let final = items.map((item)=>{
    s = s + item;
})
document.getElementById('main').innerHTML= s ;

/*setTimeout(function(){
loadedcount = 0;
var count = data.products.length;
for(var i=0;i <count;i++){
    var img = new Image();
    img.onload = function(){
        loadedcount = loadedcount+1;
        if (loadedcount==count){
            console.log("loaded")
            let items1 = data.products.map((product) => {
            return(
                `<div  class="col-12 col-sm-4 wow fadeInUp slow">
                <div class="card">
                    <div class="card-img">
                    <img src=${product.bigimg} ></img>
                    </div>
                    <div class="class-body text-center">
                        <h4 class="card-title">
                            ${product.name}
                        </h4>
                        <p class="card-text">
                            ${product.description}
                        </p>
                        <button class="btn">
                            Add to cart
                        </button>
                    </div>
                </div>
                </div>`
            )
                
        });
        let r = "";
        let final = items1.map((item)=>{
            r = r + item;
        })
        document.getElementById('main').innerHTML= r ;
        }
    };
    img.src = data.products[i].bigimg;
}
},3000)*/

var images = document.querySelectorAll("[data-src]");
    console.log("selected");
    options = {
        rootMargin : "0px 0px 50px 0px",
    }
    var imgObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                entry.target.src = entry.target.getAttribute("data-src");
                setTimeout(()=>{
                    var y = new Image();
                y.onload= ()=>{
                    entry.target.src = y.src;
                }
                y.src = entry.target.className;
                },100)
                
                
                imgObserver.unobserve(entry.target);
            }
        });
    } ,options);
images.forEach(img=>{
    imgObserver.observe(img)
})





