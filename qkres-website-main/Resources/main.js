
import {initAdmin} from "./admin"
import axios from "axios"
import moment from "moment"
import Noty from "noty"




  

let statuses = document.querySelectorAll(".status_line")
// console.log(statuses);
let hiddenPut= document.querySelector("#hiddenInput")
 
let order = hiddenPut ? hiddenPut.value : null

order= JSON.parse(order)

let time = document.createElement("small")



   function updateStatus(order){

      statuses.forEach((status)=>{
           status.classList.remove("step-completed")
           status.classList.remove("current")
      })
      let stepCompleted = true

      statuses.forEach((status)=>{
               let dataProp =status.dataset.status
               if(stepCompleted){
                  status.classList.add("step-completed")
               }
               if(dataProp===order.status){
                  stepCompleted=false
                  time.innerText = moment(order.updatedAt).format("MMM Do YY hh:mm A")
                  status.appendChild(time)
                  if(status.nextElementSibling){
                     status.nextElementSibling.classList.add("current")
                  }
                  
               }


      })

   }


   updateStatus(order)


   /// socket

   let socket = io()
  
   // join
   if(order){
      socket.emit("join",`order_${order._id}`)
   }
   let adminArea = window.location.pathname

   if(adminArea.includes("admin")){
      initAdmin(socket)
      socket.emit("join","adminRoom")
   }

   socket.on("orderUpdated",(data)=>{
      const updatedOrder={  ...order}
      updatedOrder.updatedAt = moment().format()
      updatedOrder.status= data.status
      updateStatus(updatedOrder)
      new Noty({
         type: 'success',
         timeout: 1000,
         text: "Order Status Updated",
         progressBar: false,
         layout: "topRight"
       }).show();

   })

   