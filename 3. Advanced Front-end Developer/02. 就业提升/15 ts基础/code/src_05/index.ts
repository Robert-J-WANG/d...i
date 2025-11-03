/* import sayHello, { sum, text } from "./myModule";


console.log(text);
console.log(sum(1, 2));

sayHello(); */
/* 
import fs from "fs";
const files = fs.readdirSync("./");
console.log(files); */

/* import { readdirSync } from "fs";

const files = readdirSync("./");
console.log(files);
 */

/* import * as fs from "fs";
const files = fs.readdirSync("./");
console.log(files); */

// import fs = require("fs");
// const files = fs.readdirSync("./");
// console.log(files);

import myModule = require("./myModule");

console.log(myModule.text);
console.log(myModule.sum(1, 2));
