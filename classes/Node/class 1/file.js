// common js require
const fs = require("fs");

// fs.readFile("./example.txt", (err, data) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log(data.toString());
// });

const content = "Hello world need to be added in example1";
// fs.writeFile("./example1.txt", content, (err) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log("File has been written");
// });

// fs.rename("./newfile.txt", "./oldfile.txt", (err) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log("File name has been changed");
// });

// fs.unlink("./oldfile.txt", (err) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log("File  has been deleted");
// });

// fs.appendFile("./example.txt", content, (err) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log("File  has been updated");
// });

// CRUD - create, read, update, delete

// fs.stat("./example.txt", (err, stats) => {
//   if (err) {
//     console.log("error ", err);
//     return;
//   }
//   console.log(stats);
// });

const directoryName = "./my-directory";

// fs.mkdir(directoryName, (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   console.log("Directory has been created");
// });

// fs.rmdir(directoryName, { recursive: true }, (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   console.log("Directory has been deleted");
// });

// sync
// if (fs.existsSync(directoryName)) {
//   console.log("file exisits", directoryName);
// } else {
//   console.log("file doesnt exisits", directoryName);
// }

// async
// fs.access(directoryName, fs.constants.F_OK, (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   console.log("File Exisits");
// });

const path = require("path");

// const filename = path.basename("/path/to/file.txt");
// console.log(filename);
// const dirname = path.dirname("/path/to/file.txt");
// console.log(dirname);
// const extension = path.extname("/path/to/file.txt");
// console.log(extension);

// const pathInfo = path.parse("./path/to/file.txt");
// console.log(pathInfo);

// const isAbsolute = path.isAbsolute("/path/to/file.txt");
// console.log(isAbsolute);

// problem we have copy data from source file to destination file

const sourcePath = "./newDirectory/sourceFile.txt";
const destinationPath = "./newDirectory/destinationFile.txt";

// fs.readFile(sourcePath, (err, data) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }
//   fs.writeFile(destinationPath, data.toString(), (err) => {
//     if (err) {
//       console.log("error", err);
//       return;
//     }
//     console.log("file data is copied");
//   });
// });

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.pipe(writeStream);

readStream.on("error", (err) => {
  console.log("error occured while reading stream", err);
});

writeStream.on("error", (err) => {
  console.log("error occured while writing stream", err);
});

writeStream.on("finish", () => {
  console.log("file copied successfully");
});
