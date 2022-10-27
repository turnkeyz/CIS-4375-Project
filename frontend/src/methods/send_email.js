function getQuantity(arr){
    let total = 0
    for(let x =0; x < arr.length;x++){
        total += arr[x].Quantity
    }
    return total
}
function sendInvoice(Order){
    let to = Order.Email
    let from = 'owlbeebaking@gmail.com'
    let subject = `Order #${Order.OrderID} Confirmation from OwlBBaking`
    let products = JSON.parse(Order.ProductsJSON)
    let quantity = getQuantity(products)

    let body = `Thank you for your purchase ${Order.FirstName} ${Order.LastName}. 
                We will be reaching out for confirmation.
                #of items: ${quantity}
                Subtotal:${Order.Subtotal}
                Order#${Order.OrderID}`
    
    console.log(body)
    Email.send({
      Host : import.meta.env.VITE_EMAIL_Host,
      Username : import.meta.env.VITE_EMAIL_Username,
      Password : import.meta.env.VITE_EMAIL_Password,
      To: from,
    //   To : Order.Email,
      From : from,
      Subject : subject,
      Body : body
    }).then(
      message => alert(message)
    );
}

export {sendInvoice}
