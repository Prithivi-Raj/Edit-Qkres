$(function() {
  AOS.init({
    easing: 'ease-out-back',
    duration: 1000
  });
});

 $(window).on('load', function() {
  AOS.refresh();
});




window.onscroll = function() {myFunction()};
function myFunction() {
 var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
 var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 var scrolled = (winScroll / height) * 100;
 document.getElementById("myBar").style.width = scrolled + "%";
}
