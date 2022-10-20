const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Customers = {};

// FETCHING ALL FROM Customers TABLE
Customers.findAllCustomers = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Customers;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Customers TABLE
Customers.findCustomer = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("uid", param_id)
      ;
      request.query(`SELECT * FROM Customers WHERE CustomerID=@uid;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Customers
Customers.insertCustomers = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("firstname", obj.FirstName)
        .input("lastname", obj.LastName)
        .input("email", obj.Email)
        .input("phone", obj.Phone)
        .input("pay_type", obj.PaymentType)
        .input("notes", obj.Notes)

      request.query(
        `INSERT INTO Customers (FirstName, LastName, Email, Phone, PaymentType, Notes) 
        VALUES (@firstname, @lastname, @email, @phone, @pay_type, @notes);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW product
        }
      );
    });
  });
};


// UPDATE Customers
Customers.updateCustomers = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("firstname", obj.FirstName)
        .input("lastname", obj.LastName)
        .input("email", obj.Email)
        .input("phone", obj.Phone)
        .input("pay_type", obj.PaymentType)
        .input("notes", obj.Notes)
        
      request.query(
        `UPDATE Customers 
        SET FirstName=@firstname, LastName=@lastname, Email=@email, Phone=@phone, PaymentType=@pay_type, Notes=@notes
        WHERE CustomerID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Customers DATA
        }
      );
    });
  });
};


// DELETING BY ID FROM Customers TABLE
Customers.deleteCustomersById = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("cid", param_id);
      
      request.query(`DELETE FROM Customers WHERE CustomerID = @cid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Customers DATA
      });
    });
  });
};

module.exports = Customers;