const htttp = require("http");
const routes = require("./routes");
const server = htttp.createServer(routes.handler);

server.listen(3000);
