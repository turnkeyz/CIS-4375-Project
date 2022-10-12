module.exports = app => {
    const Products = require("../controllers/products.controller.js");
  
  // fetching ALL Products route
  app.get("/Products/fetchAll", Products.getAllProducts);

  // fetch cookies
  app.get("/Products/allCookies", Products.getAllCookies);

  // fetch pastries
  app.get("/Products/allPastries", Products.getAllPastries);

  // fetch cakes
  app.get("/Products/allCakes", Products.getAllCakes);

  // fetch breads
  app.get("/Products/allBreads", Products.getAllBreads);

  // fetching Product by ID
  app.get("/Products/:pid", Products.getProduct);

// adding new Products route
app.post("/Products/insert", Products.insertNewProducts);

// node js rest api put example
app.put("/Products/update/:pid", Products.updateProducts);

// node js rest api delete example
app.delete("/Products/delete", Products.deleteProducts);
};

