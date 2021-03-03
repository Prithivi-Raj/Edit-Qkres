
import {initAdmin} from "./admin"
import axios from "axios"
import moment from "moment"
import Noty from "noty"




  

let statuses = document.querySelectorAll(".status_line")
// console.log(statuses);
let hiddenPut= document.querySelector("#hiddenInput")
 
let service = hiddenPut ? hiddenPut.value : null

service= JSON.parse(service)

let time = document.createElement("small")



   function updateStatus(service){

      statuses.forEach((status)=>{
           status.classList.remove("step-completed")
           status.classList.remove("current")
      })
      let stepCompleted = true

      statuses.forEach((status)=>{
               let dataProp = status.dataset.status
               if(stepCompleted){
                  status.classList.add("step-completed")
               }
               if(dataProp===service.status){
                  stepCompleted=false
                  time.innerText = moment(service.updatedAt).format("MMM Do YY hh:mm A")
                  status.appendChild(time)
                  if(status.nextElementSibling){
                     status.nextElementSibling.classList.add("current")
                  }
                  
               }


      })

   }


   updateStatus(service)


   /// socket

   let socket = io()
  
   // join
   if(service){
      socket.emit("join",`serviceOrder_${service._id}`)
   }
   let adminArea = window.location.pathname

   if(adminArea.includes("admin")){
      initAdmin(socket)
      socket.emit("join","adminRoom1")
   }

   socket.on("serviceOrderUpdated",(data)=>{
      const updatedServiceOrder={  ...service}
      updatedServiceOrder.updatedAt = moment().format()
      updatedServiceOrder.status= data.status
      updateStatus(updatedServiceOrder)
      new Noty({
         type: 'success',
         timeout: 1000,
         text: "Order Status Updated",
         progressBar: false,
         layout: "topRight"
       }).show();

   })
