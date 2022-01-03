const htttp = require("http");
const server = htttp.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.write("<html>");
    res.write("<head>Enter message</head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<heade><title>My frist page </title></heade>");
  res.write("<body><h1>Hello node server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
