const Orders = require("../model/orders.model");

// NODEJS CALL REST API TO INSSERT NEW Orders
exports.insertNewOrders = async (req, res) => {
    const obj = await Orders.insertOrders(req.body);
    res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getAllOrders = async (req, res) => {
  const obj = await Orders.findAllFromOrders();
  res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getProduct = async (req, res) => {
    const obj = await Orders.findProduct(req.params.oid);
    res.send(obj);
};

// NODEJS CALL REST API FOR UPDATE
exports.updateOrders = async (req, res) => {
    const obj = await Orders.updateOrders(req.params.oid, req.body);
    res.send(obj);
};

// NODEJS CALL REST API FOR DELETE
exports.deleteOrders = async (req, res) => {
    const obj = await Orders.deleteOrdersById(req.body);
    res.send(obj);
};