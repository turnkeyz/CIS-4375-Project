module.exports = app => {
    const Orders = require("../controllers/orders.controller.js");
  
    //back order
    // app.get("Orders/back/:pid", Orders.getOrderbyID);
    
    // get al orders
    app.get("/Orders/fetchAll", Orders.getAllOrders);

     // get one order by ID
     app.get("/Orders/fetchOne/:oid", Orders.getOrder);
  
    // add order
    app.post("/Orders/add", Orders.insertNewOrders);
  
    // update order
    app.put("/Orders/update/:oid", Orders.updateOrders);
  
    // delete order
    app.delete("/Orders/delete/:oid", Orders.deleteOrders);
  };