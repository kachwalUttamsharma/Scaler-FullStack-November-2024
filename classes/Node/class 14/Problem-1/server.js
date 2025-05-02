const fs = require("fs");
const path = require("path");

// const content = Math.random().toString(36).repeat(10000000);
// fs.writeFileSync(
//   "/Users/kachwaluttamsharma/Desktop/Desktop/FullStack-November-2024/classes/Node/class 14/Problem-1/bigFile.txt",
//   content
// );

// version - 1
// const http = require("http");
// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("before");
//   fs.readFile("./bigFile.txt", (err, data) => {
//     if (err) throw err;
//     res.end(data);
//     console.log("file reading completed");
//   });
//   console.log("after");
// });

// server.listen(3000, () => {
//   console.log("server is started at 3000");
// });

// version - 2 Streams
// const filePath = path.join(__dirname, "bigFile.txt");
// const readableStream = fs.createReadStream(filePath);
// const writableStream = fs.createWriteStream("copyBigFile.txt");
// const anotherWritableStream = fs.createWriteStream("copyBigFile-1.txt");

// readableStream.pipe(anotherWritableStream);

// readableStream.on("error", (err) => {
//   console.log("error while reading :", err);
// });

// writableStream.on("error", (err) => {
//   console.log("error while writing :", err);
// });

// readableStream.on("data", (chuck) => {
//   console.log(`Received ${chuck.length} bytes of data`);
//   writableStream.write(chuck);
// });

// readableStream.on("end", () => {
//   writableStream.end();
//   console.log("Finished reading file");
// });

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  const src = fs.createReadStream("./bigFile.txt");
  src.pipe(res);
});

server.listen(3000, () => {
  console.log("server is started at 3000");
});
