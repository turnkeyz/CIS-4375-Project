const Customers = require("../model/customers.model.js");

// add customer
exports.insertNewCustomers = async (req, res) => {
    const obj = await Customers.insertCustomers(req.body);
    res.send(obj);
};

// get all customers
exports.getAllCustomers = async (req, res) => {
  const obj = await Customers.findAllCustomers();
  res.send(obj);
};

// get one customer
exports.getCustomer = async (req, res) => {
    const obj = await Customers.findCustomer(req.params.uid);
    res.send(obj);
};

// update customer
exports.updateCustomers = async (req, res) => {
    const obj = await Customers.updateCustomers(req.params.uid, req.body);
    res.send(obj);
};

// delete customer
exports.deleteCustomers = async (req, res) => {
    const obj = await Customers.deleteCustomersById(req.params.uid);
    res.send(obj);
};

// exports.getNames = async (req, res) => {
//     const obj = await Customers.fetchAllNames();
//     res.send(obj)
// };

exports.getNames = async (req, res) => {
    const obj = await Customers.fetchAllNames();
    res.send(obj);
};

exports.getAllIDS = async (req, res) => {
    const obj = await Customers.fetchAllIDS();
    res.send(obj);
};