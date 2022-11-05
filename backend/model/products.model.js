const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const products = {};

// FETCHING ALL FROM Products TABLE
products.findAllFromProducts = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(
        `SELECT p.ProductID, p.CategoryID, p.ProductName, p.ProductDescription, p.Price, p.Active, c.CategoryName
        FROM Products as p
        LEFT JOIN Categories as c
        ON p.CategoryID = c.CategoryID;`, 
        (err, res) => {
        if (err) reject(err);
          console.log('line 17', res.recordset)
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
        `SELECT p.ProductID, p.CategoryID, p.ProductName, p.ProductDescription, p.Price, p.Active, c.CategoryName
        FROM Products as p
        LEFT JOIN Categories as c ON p.CategoryID = c.CategoryID
        WHERE Active=1;`, 
        (err, res) => {
        if (err) reject(err);
          console.log('line 35', res.recordset)
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
      request.query(`select p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription, p.ImageID, i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID 
      WHERE ProductID=@pid;`, (err, res) => {
        if (err) reject(err);
          console.table('line 51', res.recordset)
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
        
        .input("active", obj.Active)
        .input("ImageID", obj.ImageID)

      request.query(
        `INSERT INTO Products (CategoryID, ProductName, ProductDescription, Price, Active, ImageID) VALUES (@cid, @product_name, @description, @price, @active, @ImageID);`,
        (err, res) => {
          if (err) reject(err);
            console.log('line 77', res);
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
        
        .input("active", obj.Active)
        .input("ImageID", obj.ImageID)


      request.query(
        `UPDATE Products 
        SET CategoryID=@cid, ProductName=@product_name, ProductDescription=@description, Price=@price, Active=@active, ImageID=@ImageID
        WHERE ProductID = @param_id;`,
        (err, res) => {
          if (err) reject(err);
          console.log('line 107', res);
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
        console.log('line 125', res);
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
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription, i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      where p.CategoryID=1 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 139', res.recordset)
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
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription,i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      where p.CategoryID=2 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 153', res.recordset)
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
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription, i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      WHERE p.CategoryID=3 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 167', res.recordset)
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
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription, i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      WHERE p.CategoryID=4 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 182', res.recordset)
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
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription,  i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      WHERE p.CategoryID=6 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 197', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.findAllCakeCups = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT p.ProductID, p.CategoryID, p.ProductName, p.Price, p.Active, p.ProductDescription, i.fileID, i.fileName 
      FROM products as p
      LEFT JOIN Images as i ON p.ImageID=i.ImageID
      WHERE p.CategoryID=6 AND p.Active=1;`, (err, res) => {
        if (err) reject(err);
          console.log('line 211', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};



products.findAllFlavors = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Flavors;`, (err, res) => {
        if (err) reject(err);
          console.log('line 226', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.insertFlavor = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("FlavorName", obj.FlavorName)
      request.query(`INSERT INTO Flavors(FlavorName) VALUES(@FlavorName);`, (err, res) => {
        if (err) reject(err);
          console.log('line 240', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.updateFlavor = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("param_id", param_id)
      .input("FlavorName", obj.FlavorName)
      request.query(`UPDATE Flavors SET FlavorName=@FlavorName WHERE FlavorID=@param_id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 255', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.deleteFlavor = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("id", param_id)
      
      request.query(`DELETE Flavors WHERE FlavorID=@id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 271', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};




products.findAllShapes = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Shapes;`, (err, res) => {
        if (err) reject(err);
          console.log('line 287', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.insertShape = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("ShapeName", obj.ShapeName)
      request.query(`INSERT INTO Shapes(ShapeName) VALUES(@ShapeName);`, (err, res) => {
        if (err) reject(err);
          console.log('line 301', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.updateShape = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("param_id", param_id)
      .input("ShapeName", obj.ShapeName)
      request.query(`UPDATE Shapes SET ShapeName=@ShapeName WHERE ShapeID=@param_id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 316', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.deleteShape = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("id", param_id)
      
      request.query(`DELETE Shapes WHERE ShapeID=@id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 332', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.findAllSizes = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Sizes;`, (err, res) => {
        if (err) reject(err);
          console.log('line 345', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.insertSize = (obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("SizeName", obj.SizeName)
      request.query(`INSERT INTO Sizes(SizeName) VALUES(@SizeName);`, (err, res) => {
        if (err) reject(err);
          console.log('line 359', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

products.updateSize = (param_id, obj) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("param_id", param_id)
      .input("SizeName", obj.SizeName)
      request.query(`UPDATE Sizes SET SizeName=@SizeName WHERE SizeID=@param_id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 374', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.deleteSize = (param_id) => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("id", param_id)
      
      request.query(`DELETE Sizes WHERE SizeID=@id;`, (err, res) => {
        if (err) reject(err);
          console.log('line 390', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.insertImages = (obj) => {
  console.log(obj)
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request()
      .input("fileName", obj.fileName)
      .input("fileID", obj.fileID)
      .input("category", obj.CategoryID)
      request.query(`INSERT INTO Images([fileName], fileID, CategoryID) VALUES(@fileName, @fileID, @category);`, (err, res) => {
        if (err) reject(err);
          console.log('line 407', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};


products.fetchAllImages = () => {
  return new Promise((resolve, reject) => {
    sql.connect(sqlConfig, function (err, result) {
      var request = new sql.Request();
      request.query(`SELECT * FROM Images;`, (err, res) => {
        if (err) reject(err);
          console.log('line 153', res.recordset)
          return resolve(res.recordset); // FETCHING ALL DATA
      });
    });
  });
};

module.exports = products;