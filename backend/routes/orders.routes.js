module.exports = app => {
    const Orders = require("../controllers/orders.controller.js");
  
    // fetching ALL Orders route
    app.get("/Orders/fetchAll", Orders.getAllOrders);

     // fetching Product by ID
     app.get("/Orders/:oid", Orders.getProduct);
  
    // adding new Orders route
    app.post("/Orders/insert", Orders.insertNewOrders);
  
    // node js rest api put example
    app.put("/Orders/update/:oid", Orders.updateOrders);
  
    // node js rest api delete example
    app.delete("/Orders/delete", Orders.deleteOrders);
  };