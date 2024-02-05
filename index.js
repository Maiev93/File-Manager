import * as readline from "readline";
import { up, cd, ls } from "./nwd.js";
import { cat, add, rn, cp, mv, remove } from "./fo.js";
import { osystem } from "./osystem.js";
import { getHash, compressFile, decompressFile } from "./zip.js";

const rl = readline.createInterface(process.stdin, process.stdout);
const argv = process.argv;
const homeDir = process.env.HOME;
let username = "";

if (argv[2]) {
  username = argv[2].slice(11);
  console.log(`Welcome to the File Manager, ${username}!`);
  process.chdir(homeDir);
  console.log(`You are currently in ${homeDir}`);
} else {
  console.log(
    "Invalid input. Sure that you type your username correctly and restart a programm"
  );
}

rl.on("line", async (line) => {
  const data = line.split(" ")[0];

  switch (data) {
    case "up":
      up();
      break;
    case "cd":
      cd(line);
      break;
    case "ls":
      ls();
      break;
    case "cat":
      cat(line);
      break;
    case "add":
      add(line);
      break;
    case "rn":
      rn(line);
      break;
    case "cp":
      cp(line);
      break;
    case "mv":
      mv(line);
      break;
    case "rm":
      remove(line);
      break;
    case "os":
      osystem(line);
      break;
    case "hash":
      getHash(line);
      break;
    case "compress":
      compressFile(line);
      break;
    case "decompress":
      decompressFile(line);
      break;
    case ".exit":
      exitManager();
      break;
    default:
      console.log(
        `You type ${data}. There is no functions in the File Manager with name ${data}.`
      );
  }

  if (data !== ".exit") {
    setTimeout(() => {
      console.log(`You are currently in ${process.cwd()}`);
    }, 100);
  }
});

rl.on("SIGINT", () => {
  exitManager();
});

function exitManager() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exitCode = 0;
  rl.close();
}
