const htttp = require("http");

const express = require("express");

const app = express();

const server = htttp.createServer(app);

server.listen(3000);
