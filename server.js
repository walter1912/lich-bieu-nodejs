const express = require("express");

const connectDb = require("./config/connectDb");

// lay bien tu file .env
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const { errorHandler } = require("./middleware/errorhandler");
const app = express();

// ket noi database
connectDb();

// middle ware 
app.use(bodyParser.json());

// routing
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// middleware sau khi tra ve response 
app.use(errorHandler);

app.get('/', ()=> {
  send("Server is running")
})
const port = process.env.PORT || 5123;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
