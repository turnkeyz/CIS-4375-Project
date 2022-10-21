const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Orders = {};

// FETCHING ALL FROM Orders TABLE
Orders.findAllFromOrders = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Orders;`, (err, res) => {
        if (err) reject('line 12',err);
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
      request.query(`SELECT * FROM Orders WHERE OrderID=@oid;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
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