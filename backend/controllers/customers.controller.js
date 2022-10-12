const Customers = require("../model/customers.model");

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
    const obj = await Customers.deleteCustomersById(req.body);
    res.send(obj);
};