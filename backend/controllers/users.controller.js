const Users = require("../model/users.model");

// NODEJS CALL REST API TO INSSERT NEW Users
exports.insertNewUsers = async (req, res) => {
    const obj = await Users.insertUsers(req.body);
    res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getAllUsers = async (req, res) => {
  const obj = await Users.findAllUsers();
  res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getUser = async (req, res) => {
    const obj = await Users.findUser(req.params.uid);
    res.send(obj);
};

// NODEJS CALL REST API FOR UPDATE
exports.updateUsers = async (req, res) => {
    const obj = await Users.updateUsers(req.params.uid, req.body);
    res.send(obj);
};

// NODEJS CALL REST API FOR DELETE
exports.deleteUsers = async (req, res) => {
    const obj = await Users.deleteUsersById(req.body);
    res.send(obj);
};