module.exports = app => {
    const Customers = require("../controllers/customers.controller.js");
  
    // get all customers
    app.get("/Customers/fetchAll", Customers.getAllCustomers);

     // get one customer
     app.get("/Customer/:uid", Customers.getCustomer);
  
    // add customer
    app.post("/Customers/add", Customers.insertNewCustomers);
  
    //update customer
    app.put("/Customers/update/:uid", Customers.updateCustomers);
  
    //delete customer
    app.delete("/Customers/delete/:uid", Customers.deleteCustomers);

  
    app.get("/Customers/fetchNames", Customers.getNames);

    app.get("/Customers/fetchIDs", Customers.getAllIDS);

    app.get('/Customers/existInCart/:uid', Customers.getexistInCart)

  };
  