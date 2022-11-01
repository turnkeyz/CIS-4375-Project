const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const products = {};

// FETCHING ALL FROM Products TABLE
products.findAllFromProducts = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(
        `SELECT p.ProductID, p.CategoryID, p.ProductName, p.ProductDescription, p.Price, p.Active, p.Img_url, c.CategoryName
        FROM Products as p
        LEFT JOIN Categories as c
        ON p.CategoryID = c.CategoryID;`, 
        (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.findAllActiveProducts = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(
        `SELECT p.ProductID, p.CategoryID, p.ProductName, p.ProductDescription, p.Price, p.Active, p.Img_url, c.CategoryName
        FROM Products as p
        LEFT JOIN Categories as c ON p.CategoryID = c.CategoryID
        WHERE Active=1;`, 
        (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
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
        .input("cid", obj.CategoryID)
        .input("product_name", obj.ProductName)
        .input("description", obj.ProductDescription)
        // .input("image", obj.image)
        .input("price", obj.Price)
        .input("url", obj.Img_url)
        .input("active", obj.Active)

      request.query(
        `INSERT INTO Products (CategoryID, ProductName, ProductDescription, Price, Img_url, Active) VALUES (@cid, @product_name, @description, @price, @url, @active);`,
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
        .input("cid", obj.CategoryID)
        .input("product_name", obj.ProductName)
        .input("description", obj.ProductDescription)
        // .input("image", obj.image)
        .input("price", obj.Price)
        .input("url", obj.Img_url)
        .input("active", obj.Active)

      request.query(
        `UPDATE Products 
        SET CategoryID=@cid, ProductName=@product_name, ProductDescription=@description, Price=@price, Img_url=@url, Active=@active
        WHERE ProductID = @param_id;`,
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
products.deleteProductsById = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("pid", param_id);
      
      request.query(`DELETE FROM Products WHERE ProductID = @pid`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Products DATA
      });
    });
  });
};

// FETCHING ALL Cookies FROM Products TABLE 
products.findAllCookies = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products where CategoryID=1;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

// FETCHING ALL Pastries FROM Products TABLE
products.findAllPastries = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products where CategoryID=2;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

// FETCHING ALL Cakes FROM Products TABLE
products.findAllCakes = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products where CategoryID=3;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL Breads FROM Products TABLE
products.findAllBreads = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products where CategoryID=4;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL Cake Cups FROM Products TABLE
products.findAllCakeCups = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Products where CategoryID=6;`, (err, res) => {
        if (err) reject(err);
          console.log(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

module.exports = products;