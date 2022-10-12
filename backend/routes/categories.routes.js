module.exports = app => {
    const Categories = require("../controllers/categories.controller.js");
  
    // get all categories
    app.get("/Categories/fetchAll", Categories.getAllCategories);

     // get one category
     app.get("/Categories/:cat_id", Categories.getCategory);
  
    // add category
    app.post("/Categories/add", Categories.insertNewCategories);
  
    // node js rest api put example
    app.put("/Categories/update/:cat_id", Categories.updateCategories);
  
    // node js rest api delete example
    app.delete("/Categories/delete", Categories.deleteCategories);
  };