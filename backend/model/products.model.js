const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const products = {};

// FETCHING ALL FROM Products TABLE
products.findAllFromProducts = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products;`, (err, res) => {
        if (err) reject('line 12',err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Products TABLE
products.findProduct = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("pid", param_id)
      ;
      request.query(`SELECT * FROM Products WHERE ProductID=@pid;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Products
products.insertProducts = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("cid", obj.cid)
        .input("product_name", obj.name)
        .input("description", obj.description)
        .input("image", obj.image)
        .input("price", obj.price);

      request.query(
        `INSERT INTO Products (CategoryID, ProductName, ProductDescription, Price) VALUES (@cid, @product_name, @description, @image, @price);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW product
        }
      );
    });
  });
};


// UPDATE Products
products.updateProducts = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("cid", obj.cid)
        .input("product_name", obj.name)
        .input("description", obj.description)
        .input("image", obj.image)
        .input("price", obj.price);

      request.query(
        `UPDATE Products SET CategoryID=@cid, ProductName=@product_name, ProductDescription=@description, Price=@price WHERE ProductID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Products DATA
        }
      );
    });
  });
};


// DELETING BY ID FROM Products TABLE
products.deleteProductsById = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("pid", obj.pid);
      
      request.query(`DELETE FROM Products WHERE ProductID = @pid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Products DATA
      });
    });
  });
};

module.exports = products;