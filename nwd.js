import path from "path";
import fs from "fs/promises";

export const up = function () {
  try {
    process.chdir(path.join(".."));
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const cd = function (command) {
  try {
    const commandPath = command.slice(3);
    process.chdir(path.join(commandPath));
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const ls = async function () {
  const currentDir = process.cwd();

  try {
    const files = await fs.readdir(currentDir);
    const tableArray = [];
    for (const file of files) {
      const fileParsed = path.parse(file);
      const name = fileParsed.name;
      const type = fileParsed.ext ? "file" : "directory";
      tableArray.push({ name, type });
    }

    sortArray(tableArray, "name");
    sortArray(tableArray, "type");

    console.table(tableArray);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

function sortArray(array, sortedValue) {
  array.sort((a, b) => {
    const nameA = a[`${sortedValue}`].toUpperCase();
    const nameB = b[`${sortedValue}`].toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
