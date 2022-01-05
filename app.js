const htttp = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Inthe another middleware!!");
});

const server = htttp.createServer(app);

server.listen(3000);
