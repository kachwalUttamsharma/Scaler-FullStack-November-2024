const { exec, execFile, spawn } = require("child_process");

exec("ls -lh", (error, stdout, stderr) => {
  if (error) {
    console.log(`exec error: ${error}`);
  }
  console.log(`stdout : ${stdout}`);
  console.log(`stderr : ${stderr}`);
});

const scriptPath = "./script.sh";
const args = ["argument1", "argument2"];

execFile(scriptPath, args, (error, stdout, stderr) => {
  if (error) {
    console.log(`exec error : ${error}`);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "https://www.scaler.com",
  "--incognito",
]);
