const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Orders = {};

//TEST MODEL

Orders.findAllwithOrderID = () => {
  return new Promise((resolve,  reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request().input("pid", param_id);
      request.query(`Select TOP 1 o.OrderID, c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal, o.DateTimeOrdered, o.DeliveryDateTime, o.Status, o.CalledBackValue 
      FROM Orders as o
      LEFT JOIN Cart as c 
      ON o.CartID = c.CartID
      WHERE CartID=@pid;`, (err, res) => {
        if(err) reject (err);
        console.log(res.recordset)
        return resolve(res.recordset);
      });
    });
  });
};

// FETCHING ALL FROM Orders TABLE
Orders.findAllFromOrders = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`
      Select c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal, 
      o.OrderID, o.DateTimeOrdered, o.DeliveryDateTime, o.Status, o.CalledBackValue, o.PaymentStatus
      FROM Orders as o
      LEFT JOIN Cart as c ON o.CartID = c.CartID;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Orders TABLE
Orders.findOrder = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("oid", param_id)
      ;
      request.query(`
      Select c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal, 
      o.OrderID, o.DateTimeOrdered, o.DeliveryDateTime, o.Status, o.CalledBackValue, o.PaymentStatus,
      cu.FirstName, cu.LastName
      FROM Orders as o
      LEFT JOIN Cart as c ON o.CartID = c.CartID 
      LEFT JOIN Customers as cu ON cu.CustomerID = c.CustomerID
      WHERE OrderID=@oid;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Orders
Orders.insertOrders = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("customer_id", obj.CustomerID)
        .input("cart_id", obj.CartID)
        .input("datetime", obj.DateTimeOrdered)
        .input("contents", obj.Contents)
        .input("custom", obj.Cusomization)
        .input('custom_notes', obj.CustomerNotes)
        .input('delivery_datetime', obj.DeliveryDateTime)
        .input('status', obj.Status)
        .input('subtotal', obj.Subtotal)
        .input('called_back', obj.CalledBackValue)

      request.query(
        `INSERT INTO Orders (CustomerID, CartID, DateTimeOrdered, Contents, Customization, CustomerNotes, DeliveryDateTime, [Status], Subtotal, CalledBackValue) 
            VALUES (@customer_id, @cart_id, @datetime, @contents, @custom, @custom_notes, @delivery_datetime, @status, @subtotal, @called_back);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW product
        }
      );
    });
  });
};


// UPDATE Orders
Orders.updateOrders = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("customer_id", obj.CustomerID)
        .input("cart_id", obj.CartID)
        .input("datetime", obj.DateTimeOrdered)
        .input("contents", obj.Contents)
        .input("custom", obj.Cusomization)
        .input('custom_notes', obj.CustomerNotes)
        .input('delivery_datetime', obj.DeliveryDateTime)
        .input('status', obj.Status)
        .input('subtotal', obj.Subtotal)
        .input('called_back', obj.CalledBackValue)

    request.query(
        `UPDATE Orders 
        SET CustomerID=@customer_id, CartID=@cart_id, DateTimeOrdered=@datetime, Contents=@contents, Customization=@custom, CustomerNotes=@custom_notes, DeliveryDateTime=@delivery_datetime, [Status]=@status, Subtotal=@subtotal, CalledBackValue=@called_back
        WHERE OrderID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Orders DATA
        });
    });
  });
};


// DELETING BY ID FROM Orders TABLE
Orders.deleteOrdersById = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("oid", obj.oid);
      
      request.query(`DELETE FROM Orders WHERE OrderID = @oid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Orders DATA
      });
    });
  });
};

module.exports = Orders;