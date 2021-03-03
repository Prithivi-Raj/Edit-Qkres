

// animation on scroll
$(function() {
  AOS.init({
    easing: 'ease-out-back',
    duration: 1000
  });
});

 $(window).on('load', function() {
  AOS.refresh();
});
 // navbar color change
//  $(window).scroll(function() {
//    var scroll = $(window).scrollTop();
//    if (scroll < 150) {
//      $('.fixed-top').css('background', '#fff');
//    }
//     else {
//      $('.fixed-top').css('background', '#d3dbff');
//    }
//  });


//to make the loader stop after loading page completely 
$(document).ready(function() {
  
  setTimeout(function() {
    $('#ctn-preloader').addClass('loaded');

    // $('body').removeClass('no-scroll-y');

    if ($('#ctn-preloader').hasClass('loaded')) {

      $('#preloader').delay(1000).queue(function() {
        $(this).remove();
      });
    }
  }, 3000);
  
});








 window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}


function parallax (element,distance,speed){
const item = document.querySelector(element);
item.style.transform=`translateY(${distance*speed}px)`;
}

window.addEventListener('scroll',function(){
  parallax(".hatom",window.scrollY,0.3)
  parallax(".hflask",window.scrollY,0.2)
})

let addToCart = document.querySelectorAll(".add_To_Cart")
let cartCounter = $("#cartCounter");


function updateCart(chemical){
  axios.post("/update-cart",chemical).then(res =>{
    if(res.data.error){
    return  new Noty({
        type:"error",
        timeout:500,
        text: "Quantity can't be Negative or Zero",
        progressBar:false
      
    }).show();

    }
    if(res.data.updated){
      return  new Noty({
        type:"success",
        timeout:500,
        text: "Quantity value updated !",
        progressBar:false
      
    }).show();
    }
    if(res.data.typeError){
      return  new Noty({
        type:"error",
        timeout:1000,
        text: "Please enter value not text !",
        progressBar:false
      
    }).show();
    }
    if(res.data.typeError1){
      return  new Noty({
        type:"error",
        timeout:1000,
        text: "Alpha numeric values are not allowed",
        progressBar:false
      
    }).show();
    }
    if(res.data.null){
      return  new Noty({
        type:"error",
        timeout:1000,
        text: "Please Enter value !",
        progressBar:false
      
    }).show();
    }
    if(res.data.validationError){
      return  new Noty({
        type:"error",
        timeout:1000,
        text: "Alpha numeric values are not allowed !",
        progressBar:false
      
    }).show();
    }
    new Noty({
      type:"success",
      timeout:500,
      text: "Item added to cart Successfully",
      progressBar:false
    
  }).show();


  cartCounter.html(res.data.totalQty)

  })
}





addToCart.forEach(btn => {

  btn.addEventListener("click", event => {
     
      let chemical = JSON.parse(btn.dataset.x)
   let val = chemical.name

      chemical.required = document.getElementById(val).value
                console.log(chemical);
               updateCart(chemical)

  });

});