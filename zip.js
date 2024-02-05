import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import path from "path";

export const getHash = async function (line) {
  try {
    const filePath = line.slice(5);

    const contents = await readFile(filePath, {
      encoding: "utf8",
    });
    const hash = createHash("sha256").update(contents).digest("hex");
    console.log("Hash is: ", hash);
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const compressFile = function (line) {
  try {
    const lineArr = line.split(" ");

    const input = createReadStream(path.join(lineArr[1]));
    const output = createWriteStream(path.join(lineArr[2]));

    const compressor = createBrotliCompress();

    input.pipe(compressor).pipe(output);
    console.log("File compressed successfully.");
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};

export const decompressFile = function (line) {
  try {
    const lineArr = line.split(" ");

    const input = createReadStream(path.join(lineArr[1]));
    const output = createWriteStream(path.join(lineArr[2]));

    const decompressor = createBrotliDecompress();

    input.pipe(decompressor).pipe(output);

    console.log("Decompression complete");
  } catch (err) {
    console.error(`Operation failed. ${err}`);
  }
};
