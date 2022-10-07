module.exports = app => {
    const Users = require("../controllers/users.controller.js");
  
    // fetching ALL Users route
    app.get("/Users/fetchAll", Users.getAllUsers);

     // fetching Product by ID
     app.get("/Users/:uid", Users.getUser);
  
    // adding new Users route
    app.post("/Users/insert", Users.insertNewUsers);
  
    // node js rest api put example
    app.put("/Users/update/:uid", Users.updateUsers);
  
    // node js rest api delete example
    app.delete("/Users/delete", Users.deleteUsers);
  };