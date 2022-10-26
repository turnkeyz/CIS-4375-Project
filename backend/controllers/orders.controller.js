const Orders = require("../model/orders.model");

//testbackorder
exports.getOrderbyID = async (req, res) => {
    const obj = await Orders.findAllwithOrderID(req.params.pid, req.body);
    res.send(obj);
}

//add order
exports.insertNewOrders = async (req, res) => {
    const obj = await Orders.insertOrders(req.body);
    res.send(obj);
};

//get all orders
exports.getAllOrders = async (req, res) => {
  const obj = await Orders.findAllFromOrders();
  res.send(obj);
};

//get one order
exports.getOrder = async (req, res) => {
    const obj = await Orders.findOrder(req.params.oid);
    res.send(obj);
};

// update order
exports.updateOrders = async (req, res) => {
    const obj = await Orders.updateOrders(req.params.oid, req.body);
    res.send(obj);
};

// delete order
exports.deleteOrders = async (req, res) => {
    const obj = await Orders.deleteOrdersById(req.body);
    res.send(obj);
};