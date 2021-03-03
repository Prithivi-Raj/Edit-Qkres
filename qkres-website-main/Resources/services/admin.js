import axios from 'axios'
import moment from "moment"
import Noty from "noty"


export function initAdmin(socket) {



  const orderTableBody = $('#serviceOrderTableBody')
  let services = []
  let markup
  

  axios.get('/admin/services', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }).then(res => {

    // console.log(res);
    services = res.data
    // console.log(orders);

    markup = generateMarkup(services)
   
    // console.log(markup);

    orderTableBody.html(markup)
    


  }).catch(err => {
    console.log(err);
  })

 

  function generateMarkup(services) {
    return services.map(service => {
      return `

      <hr style="height:2px;width:100%;background:yellow;" >
      <div class="my-2"> <b> Order Placed at : </b>
      ${ moment(service.createdAt).format('MMMM Do YYYY hh:mm A') }
      </div>



               <p class="my-2"> <b>Service Id:</b> ${ service._id } </p>
<hr>

             <p class="mb-3">Service : <b>  ${ service.serviceName } </b> </p>

             <p class="mb-3">Requirement : <b>  ${ service.requirement } </b> </p>

             <p class="mb-3" ><a href="mailto:${ service.email }">Send email</a></p>

             <p class="mb-3">Pincode : <b>  ${ service.pincode } </b> </p>
        
       
               <p class="mb-3">Name: <b>  ${ service.name} </b> </p>

               <p class="mb-3">Phone : <b>  ${ service.phone} </b> </p>

               <p class="mb-3">Department : <b>  ${ service.department } </b> </p>

               <p class="mb-3">Institute : <b>  ${ service.insti } </b> </p>

               <p class="mb-3">City : <b>  ${ service.city } </b> </p>

               <p style="overflow:hidden;word-wrap:break-word;" class="mb-3">Addresss : <b>  ${ service.address } </b> </p>

               <p class="mb-3">Landmark : <b>  ${ service.landmark } </b> </p>

               <p class="mb-3">Pincode : <b>  ${ service.pincode } </b> </p>

          
               <a target="_blank" role="button" class="btn btn-lg btn-outline-primary" href="/admin/file/${service.filePath.slice(46,)}">Download Requirement File</a>
            

                    <div style="text-align:center;"  class=" my-2 ">
                        <form action="/admin/serviceOrder/status" method="POST">
                            <div class="form-group">
                            <input class="form-control input-lg" type="hidden" name="serviceOrderId" value="${ service._id }">
                            </div>
                            <select name="status" onchange="this.form.submit()">
                                <option value="order_placed"
                                    ${ service.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ service.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                                <option value="progress" ${ service.status === 'progress' ? 'selected' : '' }>
                                    In Progress</option>        
                                <option value="completed" ${ service.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
  
                            </select>

                        </form>
                    

                    </div>
        `
    }).join('')
  }



  // Socket
  socket.on('serviceOrderPlaced', (service) => {
    new Noty({
      type: 'success',
      timeout: 1000,
      text: 'New order!',
      progressBar: false,
    }).show();
    services.unshift(service)
    orderTableBody.html("")
    orderTableBody.html(generateMarkup(services))
  })

 



}
