module.exports = app => {
    const Categories = require("../controllers/categories.controller.js");
  
    // fetching ALL Categories route
    app.get("/Categories/fetchAll", Categories.getAllCategories);

     // fetching Product by ID
     app.get("/Categories/:cat_id", Categories.getCategory);
  
    // adding new Categories route
    app.post("/Categories/insert", Categories.insertNewCategories);
  
    // node js rest api put example
    app.put("/Categories/update/:cat_id", Categories.updateCategories);
  
    // node js rest api delete example
    app.delete("/Categories/delete", Categories.deleteCategories);
  };