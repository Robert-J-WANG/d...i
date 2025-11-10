import path from "path";
import fs from "fs";

const filename = path.resolve(__dirname, "./myFiles/file.txt");

const rs = fs.createReadStream(filename, {
  encoding: "utf8",
  start: 0,
  end: 100,
  highWaterMark: 1,
});

rs.on("open", () => {
  console.log("file opend");
});

rs.on("data", (chunk) => {
  console.log("reading data:", chunk);
  rs.pause();
});

rs.on("pause", () => {
  console.log("reading puased");
  setTimeout(() => {
    rs.resume();
  }, 1000);
});

rs.on("resume", () => {
  console.log("reading resumed");
});

rs.on("end", () => {
  console.log("reading data done");
});

rs.on("close", () => {
  console.log("file colesd");
});
