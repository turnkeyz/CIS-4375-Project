const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Orders = {};

//TEST MODEL

Orders.findAllwithOrderID = () => {
  return new Promise((resolve,  reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request().input("pid", param_id);
      request.query(`Select TOP 1 o.OrderID, c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal, 
      o.DateTimeOrdered, o.DeliveryDateTime, o.Status, o.CalledBackValue 
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
      Select c.CartID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal, 
      o.OrderID, o.DateTimeOrdered, o.DeliveryDateTime, o.Status, o.CalledBackValue, o.PaymentStatus,
      cu.CustomerID, cu.FirstName, cu.LastName
      FROM Orders as o
      LEFT JOIN Cart as c ON o.CartID = c.CartID
      LEFT JOIN Customers as cu ON cu.CustomerID = c.CustomerID;`, (err, res) => {
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
      cu.FirstName, cu.LastName, cu.Email
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
        .input("cart_id", obj.CartID)
        .input("datetime", obj.DateTimeOrdered)
        .input('delivery_datetime', obj.DeliveryDateTime)
        .input('status', obj.Status)
        .input('called_back', obj.CalledBackValue)
        .input('pay_status', obj.PaymentStatus)
      request.query(
        `INSERT INTO Orders (CartID, DateTimeOrdered, DeliveryDateTime, [Status], CalledBackValue, PaymentStatus) 
            VALUES (@cart_id, @datetime, @delivery_datetime, @status, @called_back, @pay_status);`,
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
        .input("cart_id", obj.CartID)
        .input("datetime", obj.DateTimeOrdered)
        .input('delivery_datetime', obj.DeliveryDateTime)
        .input('status', obj.Status)
        .input('called_back', obj.CalledBackValue)
        .input('pay_status', obj.PaymentStatus)

    request.query(
        `UPDATE Orders 
        SET CartID=@cart_id, DateTimeOrdered=@datetime, DeliveryDateTime=@delivery_datetime, [Status]=@status, CalledBackValue=@called_back, PaymentStatus=@pay_status
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