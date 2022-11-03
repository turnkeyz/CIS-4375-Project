module.exports = app => {
  const Cart = require("../controllers/cart.controller.js");
  
  // get all Cart
  app.get("/Cart/fetchAll", Cart.getAllCart);

  // get one product
  app.get("/Cart/fetchOne/:pid", Cart.getCart);

  // add product
  app.post("/Cart/add", Cart.insertNewCart);

  // update product
  app.put("/Cart/update/:pid", Cart.updateCart);

  // delete product
  app.delete("/Cart/delete/:pid", Cart.deleteCart);

  app.get("/Cart/getIDs", Cart.getAllIds);

  app.post("/Cart/form-add", Cart.insertNewCartFromForm)

  app.get("/Cart/existInOrder/:pid", Cart.getExistInOrder)
  };

