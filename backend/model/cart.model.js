const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Cart = {};

// FETCHING ALL FROM Cart TABLE
Cart.findAllFromCart = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal,
      cu.FirstName, Cu.LastName 
       FROM Cart as c
       LEFT JOIN Customers as cu ON cu.CustomerID = c.CustomerID ;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Cart TABLE
Cart.findCart = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("pid", param_id)
      ;
      request.query(
      `SELECT c.CartID, c.CustomerID, c.ProductsJSON, c.Customization, c.CustomerNotes, c.Subtotal,
      cu.FirstName, Cu.LastName 
       FROM Cart as c
       LEFT JOIN Customers as cu ON cu.CustomerID = c.CustomerID 
       WHERE CartID=@pid;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Cart
Cart.insertCart = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
      .input("cid", obj.CustomerID)
      .input("p_json", obj.ProductsJSON)
      .input("customization", obj.Customization)
      .input("customer_notes", obj.CustomerNotes)
      .input('subtotal', obj.Subtotal)

      request.query(
        `INSERT INTO dbo.Cart (CustomerID, ProductsJSON, Customization, CustomerNotes, [Subtotal])
         VALUES (@cid, @p_json, @customization, @customer_notes, @subtotal);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW Cart
        }
      );
    });
  });
};

// ADD NEW Cart
Cart.insertCartFromForm = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
      .input("cid", obj.CustomerID)
      .input("p_json", obj.ProductsJSON)
      .input("customization", obj.Customization)
      .input("customer_notes", obj.CustomerNotes)
      .input('subtotal', obj.Subtotal)

      request.query(
        `BEGIN 
	        DECLARE @id INT
	        SELECT @id = customerID from NewestCustomer
	        Insert into Cart(CustomerID, ProductsJSON, Customization, CustomerNotes, [Subtotal])
	        VALUES(@id, @p_json, @customization, @customer_notes, @subtotal)
        END;`,

        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW Cart
        }
      );
    });
  });
};


// UPDATE Cart
Cart.updateCart = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("cid", obj.CustomerID)
        .input("p_json", obj.ProductsJSON)
        .input("customization", obj.Customization)
        .input("customer_notes", obj.CustomerNotes)
        .input('subtotal', obj.Subtotal)

      request.query(
        `UPDATE Cart 
        SET CustomerID=@cid, ProductsJSON=@p_json, Customization=@customization, CustomerNotes=@customer_notes, Subtotal=@subtotal
        WHERE CartID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Cart DATA
        }
      );
    });
  });
};


// DELETING BY ID FROM Cart TABLE
Cart.deleteCartById = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("pid", param_id);
      
      request.query(`DELETE FROM Cart WHERE CartID = @pid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Cart DATA
      });
    });
  });
};

// FETCHING ALL FROM Cart TABLE
Cart.getAllCartIds = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT CartID FROM Cart;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


module.exports = Cart;