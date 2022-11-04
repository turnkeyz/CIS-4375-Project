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

  // get all cake cups
  app.get("/Products/allCakeCups", Products.getAllCakeCups);

  // get all breads
  app.get("/Products/allBreads", Products.getAllBreads);

  // get one product
  app.get("/Products/get/:pid", Products.getProduct);

  // add product
  app.post("/Products/add", Products.insertNewProducts);

  // update product
  app.put("/Products/update/:pid", Products.updateProducts);

  // delete product
  app.delete("/Products/delete/:pid", Products.deleteProducts);

  app.get("/Products/getActiveProducts", Products.getAllActiveProducts)


  app.get("/Products/getFlavors", Products.getAllFlavors)
  app.delete("/Products/Flavors/delete/:pid", Products.deleteFlavors)
  app.put("/Products/Flavors/update/:pid", Products.updateFlavors)
  app.post("/Products/Flavors/insert", Products.insertFlavors)

  app.get("/Products/getShapes", Products.getAllShapes)
  app.delete("/Products/Shapes/delete/:pid", Products.deleteShapes)
  app.put("/Products/Shapes/update/:pid", Products.updateShapes)
  app.post("/Products/Shapes/insert", Products.insertShapes)

  app.get("/Products/getSizes", Products.getAllSizes)
  app.delete("/Products/Sizes/delete/:pid", Products.deleteSizes)
  app.put("/Products/Sizes/update/:pid", Products.updateSizes)
  app.post("/Products/Sizes/insert", Products.insertSizes)

  app.post('/Products/images/add', Products.addImages)

  app.get('/Products/images/all', Products.getAllImages)
};

