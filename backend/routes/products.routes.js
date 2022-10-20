module.exports = app => {
    const Products = require("../controllers/products.controller.js");
  
  // get all products
  app.get("/Products/fetchAll", Products.getAllProducts);

  // get all cookies
  app.get("/Products/allCookies", Products.getAllCookies);

  // get all pastries
  app.get("/Products/allPastries", Products.getAllPastries);

  // get all cakes
  app.get("/Products/allCakes", Products.getAllCakes);

  // get all breads
  app.get("/Products/allBreads", Products.getAllBreads);

  // get one product
  app.get("/Products/:pid", Products.getProduct);

// add product
app.post("/Products/add", Products.insertNewProducts);

// update product
app.put("/Products/update/:pid", Products.updateProducts);

// delete product
app.delete("/Products/delete/:pid", Products.deleteProducts);
};

