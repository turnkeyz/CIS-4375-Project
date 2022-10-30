const Graphs = require("../model/graphs.model.js");

exports.getAllCartsNotInOrder = async (req, res) => {
    const obj = await Graphs.AllCartsNotInOrderView();
    res.send(obj);
};

// exports.getMonthlySellerByName = async (req, res) => {
//     const obj = await Graphs.ViewMonthlySellerByName();
//     res.send(obj);
// }

// exports.getOrdersInLastYear = async (req, res) => {
//     const obj = await Graphs.ViewOrdersInLastYear();
//     res.send(obj);
// }

// exports.getYearlyTopFiveByName = async (req, res) => {
//     const obj = await Graphs.ViewYearlyTopFiveByName();
//     res.send(obj);
// }

// exports.getRevenueByMonth = async (req, res) => {
//     const obj = await Graphs.ViewgetRevenueByMonth();
//     res.send(obj);
// }