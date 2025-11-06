// console.log(global)
/* console.log(__dirname)
console.log(__filename)
console.log(process)
console.log(process.argv)
console.log(process.platform) */

/* const result = setTimeout(() => {
  console.log(111)
}, 2000);

console.log(result) */

/* const myInterval = setInterval(() => {
  console.log('Hello');
}, 2000);

// 假设在某个条件下需要停止这个定时器
// 例如，在 10 秒后停止
setTimeout(() => {
  clearInterval(myInterval);
  console.log('Timer stopped');
}, 10000); */

/* setImmediate(() => {
  console.log("Hello");
});
 */

/* console.log(__dirname); */

/* console.log(__filename); */

/* const buf = Buffer.from("hello");
console.log(buf); */

/* console.log(process.cwd()); */

/* setTimeout(() => {
  console.log("hello");
}, 1000);
process.exit();
 */

/* console.log(process.argv); */

/* console.log(process.platform); */

// process.kill(35849);

// console.log(process.env);

// require("/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules/a.ts");

// require("./myModules/a.ts");
// require("myModules/a.ts");

/* const path = "./index.ts";
console.log(require.resolve(path));
 */

import { obj } from "./myModules/a";
console.log(obj.a);
