var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml7 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml7',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  let hiddenPut= document.querySelector("#hiddenInput")
 
let order = hiddenPut ? hiddenPut.value : null




  (function() {
    var  socket  =  io();
    $("form").on("submit",function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit(`order_${order._id}`,$("#cancel").val())
        // socket.emit("chat message", $("#cancel").val());
        // $("#m").val("");
        $("#cancel").val()
    return  true;
});
})();