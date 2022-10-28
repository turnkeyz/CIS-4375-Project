import {formatDateTimeFromSQLTOJS} from './format_date'

function getQuantity(arr){
    let total = 0
    for(let x =0; x < arr.length;x++){
        total += arr[x].Quantity
    }
    return total
}
// function sendInvoice(Order){
//     let to = Order.Email
//     let from = 'owlbeebaking@gmail.com'
//     let subject = `Order #${Order.OrderID} Confirmation from OwlBBaking`
//     let products = JSON.parse(Order.ProductsJSON)
//     let quantity = getQuantity(products)
//     let body = `Thank you for your purchase ${Order.FirstName} ${Order.LastName}. 
//                 We will be reaching out for confirmation.
//                 #of items: ${quantity}
//                 Subtotal:${Order.Subtotal}
//                 Order#${Order.OrderID}`
    
//     console.log(body)
//     Email.send({
//       Host : import.meta.env.VITE_EMAIL_Host,
//       Username : import.meta.env.VITE_EMAIL_Username,
//       Password : import.meta.env.VITE_EMAIL_Password,
//       To: from,
//     //   To : Order.Email,
//       From : from,
//       Subject : subject,
//       Body : body
//     }).then(
//       message => alert(message)
//     );
// }

// export {sendInvoice}

function productString(products){
  let string = ''
  for (var i=0; i < products.length;i++ ){
    string += `$${products[i].Price} ${products[i].ProductName} x${products[i].Quantity}|| `
    string += "\n\n"
    
  }
  return string
}


function sendInvoice(Order){
    // let email = Order.Email
    let email = 'owlbeebaking@gmail.com'
    let products = JSON.parse(Order.ProductsJSON)
    let quantity = getQuantity(products)
    let string = productString(products)
    let date = formatDateTimeFromSQLTOJS(Order.DateTimeOrdered)[0]
    var templateParams = {
      ToEmail: email,
      OrderID: Order.OrderID,
      Orders:string,
      Quantity:quantity,
      Subtotal:Order.Subtotal,
      FirstName:Order.FirstName,
      LastName:Order.LastName,
      Date:date
      
  };
  emailjs.send(import.meta.env.VITE_SERVICE, import.meta.env.VITE_TEMPLATE_INVOICE, templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

}

export {sendInvoice}