const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

require('./routes/products.routes')(app)
require('./routes/orders.routes')(app)
require('./routes/categories.routes')(app)
require('./routes/customers.routes')(app)
require('./routes/cart.routes')(app)
require('./routes/graphs.routes')(app)


// setting port to 3000, & listening for requests http request.
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});