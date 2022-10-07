const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Users = {};

// FETCHING ALL FROM Users TABLE
Users.findAllUsers = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Users;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Users TABLE
Users.findUser = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("uid", param_id)
      ;
      request.query(`SELECT * FROM Users WHERE UserID=@uid;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Users
Users.insertUsers = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("firstname", obj.firstname)
        .input("lastname", obj.lastname)
        .input("role", obj.role)
        .input("email", obj.email)
        .input("phone", obj.phone)
        .input("pay_type", obj.pay_type);

      request.query(
        `INSERT INTO Users (FirstName, LastName, [Role], Email, Phone, PaymentType) 
        VALUES (@firstname, @lastname, @role, @email, @phone, @pay_type);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW product
        }
      );
    });
  });
};


// UPDATE Users
Users.updateUsers = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("firstname", obj.firstname)
        .input("lastname", obj.lastname)
        .input("role", obj.role)
        .input("email", obj.email)
        .input("phone", obj.phone)
        .input("pay_type", obj.pay_type);
        
      request.query(
        `UPDATE Users 
        SET FirstName=@firstname, LastName=@lastname, [Role]=@role, Email=@email, Phone=@phone, PaymentType=@pay_type 
        WHERE UserID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Users DATA
        }
      );
    });
  });
};


// DELETING BY ID FROM Users TABLE
Users.deleteUsersById = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("uid", obj.uid);
      
      request.query(`DELETE FROM Users WHERE UserID = @uid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Users DATA
      });
    });
  });
};

module.exports = Users;