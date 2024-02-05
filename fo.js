import path from "path";
import { readFile, appendFile, rename, copyFile, rm } from "fs/promises";

export const cat = async function (line) {
  try {
    const filePath = line.slice(4);

    const contents = await readFile(filePath, {
      encoding: "utf8",
    });
    console.log(contents);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const add = async function (line) {
  try {
    const fileName = line.slice(4);

    await appendFile(fileName, "");
    console.log(`${fileName} is successfully created.`);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const rn = async function (line) {
  try {
    const lineArr = line.split(" ");
    if (lineArr.length > 3) {
      console.log("Operation failed. You can not use name with spaces");
      return;
    }
    const parsed = path.parse(lineArr[1]);
    await rename(
      lineArr[1],
      path.join(parsed.dir, `${lineArr[2]}${parsed.ext}`)
    );
    console.log(`${lineArr[1]} is successfully renamed.`);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const cp = async function (line, isCb = false) {
  try {
    const lineArr = line.split(" ");
    const base = path.parse(lineArr[1]).base;
    await copyFile(lineArr[1], path.join(lineArr[2], base));
    if (!isCb) {
      console.log(`${lineArr[1]} is successfully copied.`);
    }
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const mv = async function (line) {
  try {
    const lineArr = line.split(" ");
    await cp(line, true);
    await remove(line, true);
    console.log(`${lineArr[1]} is successfully moved.`);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const remove = async function (line, isCb = false) {
  try {
    const lineArr = line.split(" ");
    await rm(lineArr[1]);
    if (!isCb) {
      console.log(`${lineArr[1]} is successfully removed.`);
    }
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};
