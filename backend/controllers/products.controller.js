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

// get all breads
exports.getAllActiveProducts = async (req, res) => {
  const obj = await Products.findAllActiveProducts();
  res.send(obj);
};






exports.getAllFlavors = async (req, res) => {
  const obj = await Products.findAllFlavors();
  res.send(obj);
};

exports.deleteFlavors = async (req, res) => {
  const obj = await Products.deleteFlavor(req.params.pid);
  res.send(obj);
};

exports.updateFlavors = async (req, res) => {
  const obj = await Products.updateFlavor(req.params.pid, req.body);
  res.send(obj);
};
exports.insertFlavors = async (req, res) => {
  const obj = await Products.insertFlavor(req.body);
  res.send(obj);
};




exports.getAllShapes = async (req, res) => {
  const obj = await Products.findAllShapes();
  res.send(obj);
};

exports.deleteShapes = async (req, res) => {
  const obj = await Products.deleteShape(req.params.pid);
  res.send(obj);
};

exports.updateShapes = async (req, res) => {
  const obj = await Products.updateShape(req.params.pid, req.body);
  res.send(obj);
};
exports.insertShapes = async (req, res) => {
  const obj = await Products.insertShape(req.body);
  res.send(obj);
};



exports.getAllSizes = async (req, res) => {
  const obj = await Products.findAllSizes();
  res.send(obj);
};

exports.deleteSizes = async (req, res) => {
  const obj = await Products.deleteSize(req.params.pid);
  res.send(obj);
};

exports.updateSizes = async (req, res) => {
  const obj = await Products.updateSize(req.params.pid, req.body);
  res.send(obj);
};

exports.insertSizes = async (req, res) => {
  const obj = await Products.insertSize(req.body);
  res.send(obj);
};

exports.addImages = async (req, res) => {
  const obj = await Products.insertImages(req.body);
  res.send(obj);
};


exports.getAllImages= async (req, res) => {
  const obj = await Products.fetchAllImages();
  res.send(obj);
};