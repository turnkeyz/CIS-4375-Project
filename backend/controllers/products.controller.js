const Products = require("../model/products.model");


// add product
exports.insertNewProducts = async (req, res) => {
  const obj = await Products.insertProducts(req.body);
  res.send(obj);
};

// get all products
exports.getAllProducts = async (req, res) => {
  const obj = await Products.findAllFromProducts();
  res.send(obj);
};

// get one product
exports.getProduct = async (req, res) => {
  const obj = await Products.findProduct(req.params.pid);
  res.send(obj);
};

// update product
exports.updateProducts = async (req, res) => {
  const obj = await Products.updateProducts(req.params.pid, req.body);
  res.send(obj);
};

// delete product
exports.deleteProducts = async (req, res) => {
  const obj = await Products.deleteProductsById(req.params.pid);
  res.send(obj);
};
 // get all cookies
exports.getAllCookies = async (req, res) => {
  const obj = await Products.findAllCookies();
  res.send(obj);
};

 // get all pastries
 exports.getAllPastries = async (req, res) => {
  const obj = await Products.findAllPastries();
  res.send(obj);
};

 // get all cakes
 exports.getAllCakes = async (req, res) => {
  const obj = await Products.findAllCakes();
  res.send(obj);
};

 // get all cake cups
 exports.getAllCakeCups = async (req, res) => {
  const obj = await Products.findAllCakeCups();
  res.send(obj);
};

 // get all breads
 exports.getAllBreads = async (req, res) => {
  const obj = await Products.findAllBreads();
  res.send(obj);
};