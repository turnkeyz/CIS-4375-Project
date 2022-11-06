const sql = require("mssql");
const sqlConfig = require("../config/config.js");
const Graphs = {};

// FETCHING ALL FROM Graphs TABLE
Graphs.AllCartsNotInOrderView = () =>{
    return new Promise((resolve, reject) => {
      sql.connect(sqlConfig, function (err, result) {
        var request = new sql.Request();
        request.query(`select * from CartNotInOrders;`, (err, res) => {
          if (err) reject(err);
            console.log(res.recordset)
            return resolve(res.recordset); // FETCHING ALL DATA
        });
      });
    });
  };



  Graphs.ViewMonthlySellerByName = () => {
    return new Promise((resolve, reject) => {
      sql.connect(sqlConfig, function (err, result) {
        var request = new sql.Request();
        request.query(`Select * from MonthlyTopSellersByName;`, (err, res) => {
          if (err) reject(err);
            console.log(res.recordset)
            return resolve(res.recordset); // FETCHING ALL DATA
        });
      });
    });
  };

  Graphs.ViewOrdersInLastYear = () => {
    return new Promise((resolve, reject) => {
      sql.connect(sqlConfig, function (err, result) {
        var request = new sql.Request();
        request.query(`select [Month], NumberofOrders from OrdersInLastYear;`, (err, res) => {
          if (err) reject(err);
            console.log(res.recordset)
            return resolve(res.recordset); // FETCHING ALL DATA
        });
      });
    });
  };

  Graphs.ViewYearlyTopFiveByName = () => {
    return new Promise((resolve, reject) => {
      sql.connect(sqlConfig, function (err, result) {
        var request = new sql.Request();
        request.query(`Select * from YearlyTopFiveByName;`, (err, res) => {
          if (err) reject(err);
            console.log(res.recordset)
            return resolve(res.recordset); // FETCHING ALL DATA
        });
      });
    });
  };

  Graphs.ViewgetRevenueByMonth = () => {
    return new Promise((resolve, reject) => {
      sql.connect(sqlConfig, function (err, result) {
        var request = new sql.Request();
        request.query(`select [Month], Revenue from RevenueByMonth;`, (err, res) => {
          if (err) reject(err);
            console.log(res.recordset)
            return resolve(res.recordset); // FETCHING ALL DATA
        });
      });
    });
  };

  module.exports = Graphs