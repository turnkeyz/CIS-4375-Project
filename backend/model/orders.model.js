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
          console.table(res.recordset)
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
        .input("email", obj.email)
        .input("cart_id", obj.cid)
        .input("datetime", obj.datetime)
        .input("contents", obj.contents)
        .input("custom", obj.custom)
        .input('custom_notes', obj.custom_notes)
        .input('delivery_datetime', obj.delivery_datetime)
        .input('status', obj.status)
        .input('subtotal', obj.subtotal)

      request.query(
        `INSERT INTO Orders (Email, CartID, DateTimeOrdered, Contents, Customization, CustomerNotes, DeliveryDateTime, [Status], Subtotal) 
            VALUES (@email, @cart_id, @datetime, @contents, @custom, @custom_notes, @delivery_datetime, @status, @subtotal);`,
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
        .input("email", obj.email)
        .input("cart_id", obj.cid)
        .input("datetime", obj.datetime)
        .input("contents", obj.contents)
        .input("custom", obj.custom)
        .input('custom_notes', obj.custom_notes)
        .input('delivery_datetime', obj.delivery_datetime)
        .input('status', obj.status)
        .input('subtotal', obj.subtotal)

    request.query(
        `UPDATE Orders 
        SET Email=@email, CartID=@cart_id, DateTimeOrdered=@datetime, Contents=@contents, Customization=@custom, CustomerNotes=@custom_notes, DeliveryDateTime=@delivery_datetime, [Status]=@status, Subtotal=@subtotal 
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