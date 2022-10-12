module.exports = app => {
    const Orders = require("../controllers/orders.controller.js");
  
    // get al orders
    app.get("/Orders/fetchAll", Orders.getAllOrders);

     // get one order
     app.get("/Orders/:oid", Orders.getProduct);
  
    // add order
    app.post("/Orders/add", Orders.insertNewOrders);
  
    // update order
    app.put("/Orders/update/:oid", Orders.updateOrders);
  
    // delete order
    app.delete("/Orders/delete", Orders.deleteOrders);
  };