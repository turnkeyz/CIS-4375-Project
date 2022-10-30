module.exports = app => {
    const Graphs = require("../controllers/graphs.controller.js");
    
    app.get("/Graphs/CartNotInOrder", Graphs.getAllCartsNotInOrder);
    
    // app.get("/Graphs/MonthlySellerName", Graphs.getMonthlySellerByName);
    
    // app.get("/Graphs/OrdersThisYear", Graphs.getOrdersInLastYear);
    
    // app.get("/Graphs/TopFiveByName", Graphs.getYearlyTopFiveByName);
    
    // app.get("/Graphs/MonthlyRevenue", Graphs.getRevenueByMonth);
  
};