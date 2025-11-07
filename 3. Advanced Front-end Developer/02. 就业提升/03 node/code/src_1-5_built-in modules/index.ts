// 内置模块
// 1. os

/* const os = require("os");

console.log(os.EOL);

console.log(os.arch());

console.log(os.cpus());

const re = os.cpus();
console.log(re.length);

console.log(os.platform()); // 返回操作系统平台，如 'darwin', 'win32', 'linux'
console.log(os.type()); // 返回操作系统名称，如 'Linux', 'Darwin', 'Windows_NT'
console.log(os.arch()); // 返回 CPU 架构，如 'x64', 'arm'
console.log(os.release()); // 返回操作系统版本
console.log(os.tmpdir()); //操作系统默认的临时文件目录路径

console.log(os.totalmem()); // 返回系统总内存（字节）
console.log(os.freemem()); // 返回系统可用内存（字节）

// 转换为 MB 显示
console.log(`总内存: ${os.totalmem() / 1024 / 1024} MB`);
console.log(`可用内存: ${os.freemem() / 1024 / 1024} MB`);

console.log(os.homedir()); // 返回当前用户的主目录
console.log(os.userInfo()); // 返回当前用户的信息
console.log(os.hostname()); // 返回操作系统的主机名
 */

// const path = require("path");
// import path from "path";

/* console.log(path.sep);
console.log(path.delimiter);

const myFile = "a/b/c/index.js";
console.log(myFile.split(path.sep));
console.log(myFile.split(path.delimiter)); */

/* const envPath = process.env.PATH;
console.log(envPath);
console.log(envPath?.split(path.delimiter)); */

/* const myFile = "a/b/c/index.js";
console.log(path.dirname(myFile));
console.log(path.basename(myFile));
console.log(path.extname(myFile)); */

/* console.log(path.join("a", "b", "c", "index.ts"));
console.log(path.join("a", "b", "c", "../", "index.ts"));

console.log(path.normalize("/user/.//.docs//..//./file.txt"));

console.log(path.relative("/foo/bar/baz", "/foo/bar/qux")); // 输出: '../qux')

console.log(path.resolve("/foo/bar", "baz")); // 输出: '/foo/bar/baz')
console.log(path.resolve("/foo/bar", "./baz")); // 输出: '/foo/bar/baz')
console.log(path.resolve("/foo/bar", "../baz")); // 输出: '/foo/baz') */

/* import url from "url";
import CheckBoxGroup from "../../../07 React/03. React进阶/react-learn/07. ref转发/components/common/CheckBoxGroup/index";
import { async } from '../../../../01. 技术提升/11 工程化/06. 分页电影列表案例/练习/src/api/topMovie';

const urlString =
  "https://www.example.com:8080/path/to/resource?A=1&B=2#hash456";

// const res = url.parse(urlString);

const res = new url.URL(urlString);
console.log(res);

console.log(res.searchParams.has("A"));
console.log(res.searchParams.has("AAA"));
console.log(res.searchParams.get("B"));

const urlOjb = {
  protocol: "https:",
  username: "",
  password: "",
  host: "www.example.com:8080",
  hostname: "www.example.com",
  port: "8080",
  pathname: "/path/to/resource",
  search: "?A=1&B=2",
  hash: "#hash456",
};

console.log(url.format(urlOjb));
 */

/* import util from "util";
import { util } from 'util';

async function delay(duration = 1000): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration); // resolve(1000) 或 resolve(2000)
    }, duration);
  });
}

// 1. 定义 delayCallback 的函数重载签名
interface DelayCallback {
  // 签名 1: 带有 duration 参数 (必传或可选)
  (duration: number, callback: (err: Error, result: number) => void): void;

  // 签名 2: 不带 duration 参数 (它会使用 delay 内部的默认值 1000)
  (callback: (err: Error, result: number) => void): void;
}

// 2. 将 util.callbackify(delay) 断言为我们定义的接口
const delayCallback = util.callbackify(delay) as unknown as DelayCallback;

// --- 测试 ---

// ✅ 调用方式 1: 传递 duration (2000)
delayCallback(2000, (err, result) => {
  console.log("延迟 2000ms 结束，结果是:", result); // 2000
});

// ✅ 调用方式 2: 不传递 duration，使用默认值 1000
delayCallback((err, result) => {
  console.log("延迟 1000ms 结束，结果是:", result); // 1000
}); */

/* import util from "util";
function delayCallback(duration: number = 1000, callback) {
  setTimeout(() => {
    callback(null, duration);
  }, duration);
}

delayCallback(2000, (err, d) => {
  console.log(d);
});

const delay = util.promisify(delayCallback);

delay(2000).then((d) => {
  console.log(d);
}); */

/* import util from "util";
// import { util } from 'util';
旧的回调风格代码
function oldStyleFunc(param, callback) {
  // 一些异步操作
  setTimeout(() => {
    callback(null, `Result for ${param}`);
  }, 100);
}

// 转换为 Promise 风格
const newStyleFunc = util.promisify(oldStyleFunc);

async function useNewStyle() {
  const result = await newStyleFunc("test");
  console.log(result); // Result for test
}

useNewStyle(); */

import util from "util";
const obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: 5,
};

const obj2 = {
  a: 1,
  b: 2,
};

console.log(util.isDeepStrictEqual(obj1, obj2));
