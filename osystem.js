import os from "os";

export const osystem = function (line) {
  try {
    const lineArr = line.split(" ");
    const switchKey = lineArr[1].slice(2);
    switch (switchKey) {
      case "EOL":
        console.log("EOL: ", JSON.stringify(os.EOL));
        break;
      case "cpus":
        console.log(`Total number of processors: ${os.cpus().length}`);
        let cpusInfo = [];
        os.cpus().forEach((el, i) => {
          cpusInfo.push({
            number: i + 1,
            Model: el.model,
            Speed: el.speed / 1000,
          });
        });
        console.log(cpusInfo);
        break;
      case "username":
        console.log("Username: ", os.userInfo().username);
        break;
      case "homedir":
        console.log("HomeDir: ", os.homedir());
        break;
      case "architecture":
        console.log(
          "Processor architecture for which the Node.js binary is compiled: ",
          os.arch()
        );
        break;
      default:
        console.error("Operation failed. Incorrect command");
        break;
    }
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};
