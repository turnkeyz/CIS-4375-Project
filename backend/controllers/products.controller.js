const Products = require("../model/products.model");


// NODEJS CALL REST API TO INSSERT NEW Products
exports.insertNewProducts = async (req, res) => {
  const obj = await Products.insertProducts(req.body);
  res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getAllProducts = async (req, res) => {
  const obj = await Products.findAllFromProducts();
  res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getProduct = async (req, res) => {
  const obj = await Products.findProduct(req.params.pid);
  res.send(obj);
};

// NODEJS CALL REST API FOR UPDATE
exports.updateProducts = async (req, res) => {
  const obj = await Products.updateProducts(req.params.pid, req.body);
  res.send(obj);
};

// NODEJS CALL REST API FOR DELETE
exports.deleteProducts = async (req, res) => {
  const obj = await Products.deleteProductsById(req.body);
  res.send(obj);
};