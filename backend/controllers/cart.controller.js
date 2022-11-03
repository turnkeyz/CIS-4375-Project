const Cart = require("../model/cart.model");


// add product
exports.insertNewCart = async (req, res) => {
  const obj = await Cart.insertCart(req.body);
  res.send(obj);
};

// get all Cart
exports.getAllCart = async (req, res) => {
  const obj = await Cart.findAllFromCart();
  res.send(obj);
};

// get one product
exports.getCart = async (req, res) => {
  const obj = await Cart.findCart(req.params.pid);
  res.send(obj);
};

// update product
exports.updateCart = async (req, res) => {
  const obj = await Cart.updateCart(req.params.pid, req.body);
  res.send(obj);
};

// delete product
exports.deleteCart = async (req, res) => {
  const obj = await Cart.deleteCartById(req.params.pid);
  res.send(obj);
};

// delete product
exports.getAllIds = async (req, res) => {
  const obj = await Cart.getAllCartIds(req.body);
  res.send(obj);
};

exports.insertNewCartFromForm = async (req, res) => {
  const obj = await Cart.insertCartFromForm(req.body);
  res.send(obj);
};

exports.getExistInOrder = async (req, res) => {
  const obj = await Cart.fetchExistInOrder(req.params.pid);
  res.send(obj);
};
