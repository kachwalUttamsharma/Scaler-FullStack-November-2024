const http = require("http");

const server = http.createServer((req, res) => {
  //   res.setHeader("Content-Type", "text/html");
  //   res.write(`<html><body>
  //     <h1>HTML being served from server</h1>
  //     </body></html>`);

  res.setHeader("Content-Type", "application/json");

  res.write(
    JSON.stringify({
      message: "hello world",
      date: new Date(),
    })
  );

  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("server is running");
});
