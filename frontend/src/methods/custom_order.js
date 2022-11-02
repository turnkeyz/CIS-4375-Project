
function customOrder(Order){

   // console.log('line 3',Order.ProductsJSON)
   // var base64 = Order.Img_url[0].toDataURL()

   // For images
   var base = [{
      data:Order.Img_url,
      alternative:true},
      {
         path:"path/image/image.jpeg", type:"image/jpeg",headers:{"Content-ID":Order.Img_url}
      }
   ]
   var base2 =[
      Order.my_file, 
      {
         headers:{
            'Content-Type':'multipart/form-data'
         }
      }
   ]

   function productString(products){
      let string = ''
      for (var i=0; i < products.length;i++ ){
        string += `$${products[i].Price} ${products[i].ProductName} x${products[i].Quantity}\n`
      //   string += '<br />'
        
      }
      return string
    }
   console.log('line 33',Order)
   
   let products = productString(Order.Products)
   var templateParams = {
   CustomerID:Order.CustomerID,
   CustomerNotes:Order.CustomerNotes,
   Email:Order.Email,
   FirstName:Order.FirstName,
   LastName:Order.LastName,
   PaymentType:Order.PaymentType,
   Phone:Order.Phone,
   Products:products,
   Subtotal:Order.Subtotal
   
   // Date:date,
   // my_file:Order.my_file,
   // content:Order.my_file64,
   // content:Order.file
   }
  emailjs.send(import.meta.env.VITE_SERVICE, import.meta.env.VITE_TEMPLATE_ORDER_FORM, templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

}

export {customOrder}