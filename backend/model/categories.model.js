const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Categories = {};

// FETCHING ALL FROM Categories TABLE
Categories.findAllFromCategories = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Categories;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// FETCHING ALL FROM Categories TABLE
Categories.findCategory = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("cat_id", param_id)
      ;
      request.query(`SELECT * FROM Categories WHERE CategoryID=@cat_id;`, (err, res) => {
        if (err) reject(err);
          console.table(res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


// ADD NEW Categories
Categories.insertCategories = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("category_name", obj.category_name)
        
      request.query(
        `INSERT INTO Categories(CategoryName) VALUES(@category_name);`,
        (err, res) => {
          if (err) reject(err);
            console.log(res);
          return resolve(res); // ADDING NEW Categories
        }
      );
    });
  });
};


// UPDATE Categories
Categories.updateCategories = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      // PARAMETERIZING QUERIES
      var request = new sql.Request()
        .input("param_id", param_id)
        .input("category_name", obj.category_name)
    request.query(
        `UPDATE Categories 
        SET CategoryName=@category_name
        WHERE CategoryID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log(res);
          return resolve(res); // UPDATING Categories DATA
        });
    });
  });
};


// DELETING BY ID FROM Categories TABLE
Categories.deleteCategoriesById = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("cat_id", obj.cat_id);
      
      request.query(`DELETE FROM Categories WHERE CategoryID = @cat_id`, (err, res) => {
        if (err) reject(err);
        console.log(res);
        return resolve(res); // DELETING Categories DATA
      });
    });
  });
};

module.exports = Categories;