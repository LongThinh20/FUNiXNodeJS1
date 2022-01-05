const htttp = require("http");

const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In the middleware");
  res.send('<h1>The "Add Product " Page </h1>');
});

app.use("/", (req, res, next) => {
  console.log("Inthe another middleware!!");
  res.send("<h1>Hello from Express.js</h1>");
});

const server = htttp.createServer(app);

server.listen(3000);
