# nodejs basic

## 1. node 核心

### 1-1 node 概述

#### 1. 什么是 node

- 是一个 JavaScript 语言的运行环境 （网页浏览器也是一个运行环境，用来解析和渲染网页代码）

  > 通俗理解：JavaScript 是浏览器端运行的 js，nodejs 是在 node 环境运行的 js

- node 比浏览器环境有更强的能力

  - 浏览器中的 js

    - Javascript = EcamScript + Web Api

    - EcamScript 是 js 语言的规范标准

    - Web Api 提供了访问浏览器窗口和页面的能力
      ```markdown
      - BOM：浏览器对象模型， 用于与浏览器窗口进行交互，核心对象 window
      - DOM： 文档对象模型，用于操作 HTML 和 XML 文档的内容和结构，核心对象 document
      - AJAX： 异步通信的技术模型， 传统 Ajax，基于`XMLHttpRequest` (XHR) 对象实现， es6 新增 fetch 对象替代传统 Ajax
      ```
    - 这种能力非常有限

      ```markdown
      - 跨域的问题
      - 文件读写
      ```

  - node 中的 js

    - nodejs = EcamScript + Node Api

    - Node Api 提供了几乎所有的能力

      > 那为什么不直接使用 nodejs 开发 web 呢？？主要是用户只安装浏览器，而不安装 node 运行时。 所以给用户使用的（浏览器中运行的）是 JavaScript， 而有一些功能，不需要给用户使用（比如控制服务器等等），我们就能通过 nodejs 实现

- **JavaScript VS nodejs**

  - **浏览器提供了有限的能力， js 只能在浏览器中做有限的操作**
  - **node 提供了完整的控制计算机的能力，js 可以通过 node 提供的接口，实现对整个计算机操作系统的控制**

#### 2. 我们用 node 来干什么？

- 开发桌面端程序

- 开发服务端程序

  - 模式 1：nodejs 开发的服务器, 浏览器 > node 服务器应用 > 数据库

    ```markdown
    - 通常用于微型的网站，比如个人博客，公司官网，小型电商（卖酒的，卖茶叶的）
    - node 服务器要完成请求的处理、响应， 和数据库的交互，以及各种业务逻辑
    ```

  - 模式 2：nodejs 开发一个中间层服务器， 浏览器 > node 服务器应用 > 后端服务器 > 数据库

    ```markdown
    - 这种结构非常常见，应用在各种规模的站点上
    - node 服务器不做任何和业务相关的事情，只做一些简单的转发请求。但可能会做一些额外的功能：
      - 简单的信息记录：请求日志，个人偏好，广告信息等等
      - 静态资源托管
      - 缓存
    ```

#### 3. 前置课程

网络通信 + es6 + 模块化 + 包管理器

### 1-2 全局对象

在 Node.js 中，`global` 就相当于浏览器中的 `window`，它是所有全局变量和函数的根作用域对象。可以在任意文件中直接使用它的属性，而不用显式写 `global.`。最常用的属性有：

#### 1. 计时器

- setTimeout / clearTimeout : 延迟执行一个函数

  ```js
  const result = setTimeout(() => {
    console.log("Hello");
  }, 2000);

  console.log(result);
  ```

  运行结果：

  ```bash
  Timeout {
    _idleTimeout: 2000,
    _idlePrev: [TimersList],
    _idleNext: [TimersList],
    _idleStart: 104,
    _onTimeout: [Function (anonymous)],
    _timerArgs: undefined,
    _repeat: null,
    _destroyed: false,
    [Symbol(refed)]: true,
    [Symbol(kHasPrimitive)]: false,
    [Symbol(asyncId)]: 2,
    [Symbol(triggerId)]: 1
  }
  Hello

  ```

- setInterval / clearInterval : 周期性地执行一个函数

  ```js
  const myInterval = setInterval(() => {
    console.log("Hello");
  }, 2000);

  // 假设在某个条件下需要停止这个定时器
  // 例如，在 10 秒后停止
  setTimeout(() => {
    clearInterval(myInterval);
    console.log("Timer stopped");
  }, 10000);
  ```

  运行结果：

  ```bash
  Hello
  Hello
  Hello
  Hello
  Timer stopped
  ```

- setImmediate / clearImmediate : 立即执行一个函数，它类似于 `setTimeout`，但是会在当前事件循环的末尾立即执行回调函数，而不是等待一定的延迟时间。

  ```js
  setImmediate(() => {
    console.log("Hello");
  });
  ```

  **注意：Node.js 计时器相关的函数，返回值是一个对象，而不是浏览器环境中的一个数字（计时器 id)**

#### 2. 控制台

- console 输出日志, 和浏览器中的一样

#### 3. 模块级

不是 global 的属性，但全局可用

- \_\_dirname ：当前模块文件所在目录的绝对路径

  ````js
  console.log(__dirname);
  
  // Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src
  
  - \_\_filename ：当前模块文件的完整绝对路径
  
  ```js
  console.log(__filename);
  
  // /Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/index.ts
  ````

  require : CommonJS 模块加载函数（模块作用域内全局）

  ```js
  const fs = require("fs");
  ```

  - exports`/`module.exports: 模块导出对象（模块作用域内全局）

    ```js
    module.exports = { a: 1 };
    ```

#### 4. 系统级

process ：当前 Node 的**进程**对象，包含运行环境、参数、事件等信息

- cwd() : 当前执行的命令行所在的位置（比如终端里输入命令时所处的位置）

  ```js
  console.log(process.cwd());

  // /Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code
  ```

- exit() : 强制退出当前的进程

  ```js
  setTimeout(() => {
    console.log("hello"); // 1秒钟之后不会打印出"hello"， 进程被强制退出了
  }, 1000);
  process.exit();
  ```

- argv : 获取当前执行的命令中的所有参数

  ```bash
  npm run dev a=1 b=2
  // 等价于执行
  ts-node src/index.ts a=1 b=2
  ```

  ```js
  console.log(process.argv);

  // [
    '/Users/aqiang/.nvm/versions/node/v20.11.1/bin/ts-node',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/index.ts',
    'a=1',
    'b=2'
  ]
  ```

- platform : 当前 node 所在的操作系统

  ```js
  console.log(process.platform); // darwin 达尔文操作系统
  ```

- kill (pid) : 结束某个进程, 需要知道某个进程的 id

  ```js
  process.kill(1649); // 结束preview图片查看器
  ```

  > 查找进程： command + space: activity monitor

- env: 环境变量对象

  ```js
  console.log(process.env);

  // {
    AUTOJUMP_ERROR_PATH: '/Users/aqiang/Library/autojump/errors.log',
    NVM_INC: '/Users/aqiang/.nvm/versions/node/v20.11.1/include/node',
    TERM_PROGRAM: 'vscode',
    NODE: '/Users/aqiang/.nvm/versions/node/v20.11.1/bin/node',
    AUTOJUMP_SOURCED: '1',
    NVM_CD_FLAGS: '-q',
    _P9K_TTY: '/dev/ttys006',
    INIT_CWD: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code',
    SHELL: '/bin/zsh',
    TERM: 'xterm-256color',
  ...
    npm_config_prefix: '/Users/aqiang/.nvm/versions/node/v20.11.1',
    npm_node_execpath: '/Users/aqiang/.nvm/versions/node/v20.11.1/bin/node'
  }
  ```

- Buffer : 处理二进制数据的类, 结合文件流，对文件数据（文档，图片等等）进行处理

  ```js
  const buf = Buffer.from("hello");
  console.log(buf);
  
  // <Buffer 68 65 6c 6c 6f>
  ```

### 1-3 node 的模块化细节

#### 1. 模块的查找

需要查找模块（文件）的路径， 有一下几种：

- 绝对路径： 模块（文件）在磁盘中的完整路径

  ```ts
  require("/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules/a.ts");
  ```

  - 使用 require 函数，根据绝对路径直接加载模块

  - 注意： 其他的路径写法，最终都会转换成绝对路径加载模块

- 相对路径 ./ 或者../

  - 这种写法，常用于加载我们自定义的模块

  - 相对于当前模块

  ```ts
  require("./myModules/a.ts");
  ```

- 相对路径

  - 常用于加载内置模块，或者包管理器下载的第三方库模块（node_modules 里）

  ```ts
  require("myModules/a.ts"); // 会导入node_modules里我们自定义的 myModules/a.ts 模块
  ```

  查找顺序如下：

  - 检查是否是内置模块，如：fs, path 等
  - 检查当前目录中的 node_modules
  - 检查上级目录中的 node_modules

- 关于后缀名

  - 如果不写后缀名，会自动补全
  - 常见的模块后缀：js, ts, json, node, mjs 等

- 关于文件名

  - 如果仅提供目录， 不提供文件名，则自动查找该目录中的 index.js（index.ts)

  ```ts
  require("./myModules"); // 相当于查找 "./myModules/index.ts"
  ```

- 关于 package.json 中的 main 字段
  - 表示包的默认入口
  - 导入或者执行包时，若仅提供目录，则使用 main 字段的值补全入口
  - 默认值为 index.js

#### 2. module 对象

**`module` 对象代表当前正在执行的模块本身。**
它包含了关于这个模块的元信息（例如文件路径、导出内容、依赖等），并且与 `exports`、`require`、`__filename`、`__dirname` 等共同构成 Node.js 的模块系统基础。

```ts
// ./myModules/a.ts
console.log(module); // ./myModules/a.ts这个模块的元信息

// ./index.ts
require("./myModules/a.ts");
```

```bash
{
  id: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules/a.ts',
  path: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules',
  exports: {},
  filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules/a.ts',
  loaded: false,
  children: [],
  paths: [
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myModules/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/duyi/node_modules',
    '/Users/aqiang/Desktop/myGitHub/upload/node_modules',
    '/Users/aqiang/Desktop/myGitHub/node_modules',
    '/Users/aqiang/Desktop/node_modules',
    '/Users/aqiang/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ],
  _compile: [Function (anonymous)]
}
```

#### 3. require 函数

`require()` 是 Node.js 用来**加载模块**（module）的函数。
它负责把外部文件或包引入到当前文件中使用。

```bash
[Function: require] {

  // 路径解析函数 - 解析成绝对路径
  resolve: [Function: resolve] { paths: [Function: paths] },

  // 包入口模块
  main: {
    id: '.',
    path: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src',
   ...
    _compile: [Function (anonymous)]
  },

  // 对后缀名的处理
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)],
    '.ts': [Function (anonymous)]
  },

  // 已经缓存的模块
  cache: [Object: null prototype] {
    '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/dist/bin.js': {
      id: '.',
      path: '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/dist',
      exports: [Object],
      filename: '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/dist/bin.js',
      loaded: false,
      children: [Array],
      paths: [Array]
    },

    ...

    '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js': {
      id: '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js',
      path: '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/node_modules/@jridgewell/resolve-uri/dist',
      exports: [Function: resolve],
      filename: '/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/ts-node/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  }
}
```

- resolve 的使用

  ```ts
  const path = "./index.ts";
  console.log(require.resolve(path)); // 解析成绝对路径
  ```

  ```bash
  Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/index.ts
  ```

- 其他的静态属性和方法了解一下

#### 4. 模块执行原理

当执行一个模块，或者使用 require 函数时，会将模块放置于一个函数环境中，放置污染全局变量

Node 内部会用一个函数包装模块代码：

```js
(function (exports, require, module, __filename, __dirname) {
  // 模块源代码
});
```

这就是为什么：

- 每个模块都有 `exports`、`module`、`require`、`__dirname`、`__filename`
- 但它们看似“全局变量”，其实是函数作用域内传进来的参数。

### 1-4 node 中的 ES 模块化

#### 1. 问题

- 与 Node.js 长期使用的 CommonJS 模块化存在不兼容问题， 有些问题还在持续优化
- 目前 node 中的 ES 模块化仍然处于试验阶段

#### 2. 使用

- 一个项目中的模块，要么是 commonjs，要么是 es, 不要混用

- Commonjs : 默认情况下，都是 commonjs。 一些第三方库都是用 commonjs 编写的，为了兼容这些第三方库，node 的模块化默认使用 commonjs
- ES 模块化的实现方式
  - 将文件名改为 mjs
  - 或者在里模块层级最近的一个 package.json 里设置 **"type"**: "module"

#### 3. 结合 ts

如果结合 ts 的话，不用做上面的设置，代码的编写允许用 ESM 写法，但会编译成 CommonJS

```ts
// ./myModules/a.ts
export const obj = { a: 1, b: 2 };
```

```ts
// ./index.ts
import { obj } from "./myModules/a";
console.log(obj.a);
```

```json
// tscofig.json

{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // tsc编译选项
    "target": "es6", // 目标代码版本标准

    "module": "commonjs", // 目标使用模块化规范标准

    "lib": ["es6"], // 编译时使用的环境（引入的库文件）
    "outDir": "./dist", // 编译后文件存放位置
    "strictNullChecks": true, // 是否开启严格的空值检查
    "removeComments": true, // 是否移除注释
    "alwaysStrict": false, // 是否在编译后的文件中添加'use strict'
    "esModuleInterop": true, // 允许使用ES6模块化语法去引入CommonJS模块
    "noEmitOnError": true, // 有错误的代码时不编译
    "strictPropertyInitialization": true //严格检查属性的初始化
  },

  "include": ["./src"]
  // 需要编译的文件的如何文件夹
}
```

编译的结果 ：commonjs 标准

```js
// ./myModules/a.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
exports.obj = { a: 1, b: 2 };
```

```js
// ./index.js
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./myModules/a");
console.log(a_1.obj.a);
```

### 1-5 基本内置模块

#### 1. os 模块

提供了与操作系统相关的实用方法和属性, 允许开发者在*Node*.js 应用程序中获取和操作与操作系统相关的信息

- 属性 EOL: 返回当前操作系统的行尾标识符（`\n` 或 `\r\n`），方便处理跨平台的文件读写。

```ts
const os = require("os");

console.log(os.EOL); // // Windows 输出：'\r\n'，Linux 输出：'\n'
```

- 操作系统信息
  - platform()
  - type()
  - arch()
  - release()
  - **==tmpdir()==**: 操作系统默认的临时文件目录路径

```ts
console.log(os.platform()); // 返回操作系统平台，如 'darwin', 'win32', 'linux'
console.log(os.type()); // 返回操作系统名称，如 'Linux', 'Darwin', 'Windows_NT'
console.log(os.arch()); // 返回 CPU 架构，如 'x64', 'arm'
console.log(os.release()); // 返回操作系统版本
console.log(os.tmpdir()); //操作系统默认的临时文件目录路径
```

```bash
darwin
Darwin
x64
23.6.0
/var/folders/86/0g_1xp112fj7n4q6lnjh2trc0000gn/T
```

- cpu 信息
  - ==**cpus()** :== 回一个对象数组，每个对象包含 CPU 内核的信息，如型号、速度、使用情况等

```ts
console.log(os.cpus()); // 返回包含每个 CPU/核心信息的对象数组
```

```bash
[
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 17929570, nice: 0, sys: 8592460, idle: 91788490, irq: 0 }
  },
  ...
  {
    model: 'Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz',
    speed: 2600,
    times: { user: 552440, nice: 0, sys: 296670, idle: 118009750, irq: 0 }
  }
]
```

```ts
const re = os.cpus();
console.log(re.length); // 12核
```

- 内存信息
  - totalmem()
  - freemem()

```ts
console.log(os.totalmem()); // 返回系统总内存（字节）
console.log(os.freemem()); // 返回系统可用内存（字节）

// 转换为 MB 显示
console.log(`总内存: ${os.totalmem() / 1024 / 1024} MB`);
console.log(`可用内存: ${os.freemem() / 1024 / 1024} MB`);
```

```bash
17179869184
22142976
总内存: 16384 MB
可用内存: 21.1328125 MB
```

- 用户信息

  - hostname()

  - homedir()
  - userInfo()

```ts
console.log(os.hostname()); // 返回操作系统的主机名
console.log(os.homedir()); // 返回当前用户的主目录
console.log(os.userInfo()); // 返回当前用户的信息
```

```bash
AqiangRobert.local

/Users/aqiang

{
  uid: 501,
  gid: 20,
  username: 'aqiang',
  homedir: '/Users/aqiang',
  shell: '/bin/zsh'
}
```

#### 2. path 模块

专门用于处理文件和目录路径

> ##### 为什么需要 path 模块 ??
>
> 不同操作系统使用不同的路径分隔符：
>
> - Windows 使用反斜杠 `\`
> - Unix/Linux/macOS 使用正斜杠 `/`
>
> `path` 模块会自动处理这些差异，让你的代码在不同平台上都能正常工作。

- 路径分隔符
  - `sep` - 平台特定的路径分隔符, 同一个模块内容的分割
  - `delimiter` - 平台特定的路径分隔符（用于 PATH 环境变量）， 不同模块之间的分割

```ts
console.log(path.sep); // Windows 输出 '\', Unix 输出 '/'
console.log(path.delimiter); // Windows 输出 ';', Unix 输出 ':'
```

```
/
:
```

```ts
const myFile = "a/b/c/index.js";
console.log(myFile.split(path.sep));
console.log(myFile.split(path.delimiter)); // 同一个模块无法使用这个分割
```

```
[ 'a', 'b', 'c', 'index.js' ]
[ 'a/b/c/index.js' ]
```

delimiter 用于 PATH 环境变量

```
const envPath = process.env.PATH;
console.log(envPath); // 不同的路径使用：分割
```

```bash
/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/duyi/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/upload/node_modules/.bin:/Users/aqiang/Desktop/myGitHub/node_modules/.bin:/Users/aqiang/Desktop/node_modules/.bin:/Users/aqiang/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/aqiang/.nvm/versions/node/v20.11.1/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/aqiang/.nvm/versions/node/v20.11.1/bin:/Users/aqiang/.nvm/versions/node/v20.11.1/bin:/Users/aqiang/.nvm/versions/node/v16.18.1/bin:/Library/Frameworks/Python.framework/Versions/3.12/bin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/usr/local/share/dotnet:~/.dotnet/tools:/Users/aqiang/.nvm/versions/node/v16.18.1/bin:/Library/Frameworks/Python.framework/Versions/3.12/bin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/Users/aqiang/bin:/Users/aqiang/bin
```

分割之后

```TS
console.log(envPath?.split(path.delimiter));
```

```bash
[
  '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/node_modules/.bin',
  '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/node_modules/.bin',
...
  '/bin',
  '/usr/sbin',
  '/sbin',
  '/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin',
  '/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin',
  '/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin',
  '/usr/local/share/dotnet',
  '~/.dotnet/tools',
  '/Users/aqiang/.nvm/versions/node/v16.18.1/bin',
  '/Library/Frameworks/Python.framework/Versions/3.12/bin',
  '/Library/Frameworks/Python.framework/Versions/3.10/bin',
  '/Users/aqiang/bin',
  '/Users/aqiang/bin'
]
```

- 获取一个文件路径的属性

  - dirname ：文件的目录

  - basename ：文件名

  - extname ：文件扩展名

  - > \_\_filename : 全局变量（当前文件）
    >
    > 通常的 filename, 包含完整的目录和文件名。basename 不包含路径
    >
    > ```ts
    > console.log(__filename); // 比如全局变量。文件的完整路径+文件名
    > ```

```ts
const path = require("path");

const myFile = "a/b/c/index.js";
console.log(path.dirname(myFile));
console.log(path.basename(myFile));
console.log(path.extname(myFile));
```

```bash
a/b/c
index.js
.js
```

- 路径处理

  - **==join：==** 多段路径拼接成一个完整路径, **能识别相对路径**

  ```ts
  console.log(path.join("a", "b", "c", "index.ts")); // a/b/c/index.ts
  console.log(path.join("a", "b", "c", "../", "index.ts")); // a/b/index.ts
  ```

  - nornalize： 规范化路径，处理多余的 `.`、`..` 和分隔符

  ```ts
  console.log(path.normalize("/user/.//.docs//..//./file.txt")); // /user/file.txt
  ```

  - relative : 返回从 一个 路径到 另一个 路径的相对路径。

  ```ts
  console.log(path.relative("/foo/bar/baz", "/foo/bar/qux")); // '../qux')
  ```

  - **==resolve==** : 将路径序列解析为绝对路径，从右到左依次处理每个路径片段，直到构建出一个绝对路径为止。

  ```ts
  console.log(path.resolve("/foo/bar", "baz")); // 输出: '/foo/bar/baz')
  console.log(path.resolve("/foo/bar", "./baz")); // 输出: '/foo/bar/baz')
  console.log(path.resolve("/foo/bar", "../baz")); // 输出: '/foo/baz')
  ```

#### 3. url 模块

用于处理和解析 URL（统一资源定位符）。可以解析、格式化和处理 URL 字符串

- ~~parse()： 将一个 URL 字符串解析为一个 URL 对象~~ **已废弃**

```ts
import url from "url";

const urlString =
  "https://www.example.com:8080/path/to/resource?A=1&B=2#hash456";

const res = url.parse(urlString);
console.log(res);
```

```bash
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.example.com:8080',
  port: '8080',
  hostname: 'www.example.com',
  hash: '#hash456',
  search: '?A=1&B=2',
  query: 'A=1&B=2',
  pathname: '/path/to/resource',
  path: '/path/to/resource?A=1&B=2',
  href: 'https://www.example.com:8080/path/to/resource?A=1&B=2#hash456'
}
```

推荐使用新版的构造方法

```ts
const res = new url.URL(urlString);
console.log(res);
```

```bash
URL {
  href: 'https://www.example.com:8080/path/to/resource?A=1&B=2#hash456',
  origin: 'https://www.example.com:8080',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.example.com:8080',
  hostname: 'www.example.com',
  port: '8080',
  pathname: '/path/to/resource',
  search: '?A=1&B=2',
  searchParams: URLSearchParams { 'A' => '1', 'B' => '2' },
  hash: '#hash456'
}
```

一些用法

```ts
console.log(res.searchParams.has("A")); // true
console.log(res.searchParams.has("AAA")); // false
console.log(res.searchParams.get("B")); // 2
```

- format()： 与 `parse()` 相反，它将 URL 对象转换为字符串形式

```js
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

console.log(url.format(urlOjb)); // https://www.example.com:8080/path/to/resource?A=1&B=2#hash456
```

#### 4. util 模块

- 回调风格转换

  - callbackify() - 将回 Promise 的函数转换为回调风格的函数

  ```ts
  import util from "util";

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
  });
  ```

  - **==promisify()==** - 将回调风格的函数转换为返回 Promise 的函数

  ```ts
  import util from "util";
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
  });
  ```

  这样我们经常将旧版本的 callback 形式转换成 promise 形式，进而可以使用 es 新标准的语法糖 async, await

- 类型检查工具

  - **isDeepStrictEqual(val1, val2)** - 测试两个值是否深度严格相等

  ```ts
  mport util from "util";
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
  
  console.log(util.isDeepStrictEqual(obj1, obj2)); // false
  ```

### 1-6 文件 I/O

#### 1. I/O: input/output

- 对外部设备的输入和输出
- 外部设备：
  - 磁盘
  - 网卡
  - 显卡
  - 打印机
  - 其他
- IO 的速度往往低于内存和 CPU 交互的速度

#### 2. fs 模块

- readFile() - 读取一个文件

```ts
import fs from "fs";
import path from "path";

// 获取文件的绝对路径
const filepath = path.resolve(__dirname, "./myFiles/file.txt");

// 读取文件的内容

// 格式1：
fs.readFile(filepath, (err, content) => {
  console.log(content); // 读取的是Buffer格式 <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 20 6a 73 20>
  console.log(content.toString()); // 转换为字符串 hello node js
});

// 格式2：
fs.readFile(filepath, "utf-8", (err, content) => {
  console.log(content); // hello node js
});

// 格式3：
fs.readFile(filepath, { encoding: "utf-8" }, (err, content) => {
  console.log(content); // hello node js
});
```

> 注意：
>
> - fs 模块处理文件的方法都是异步的（读写文件内容需要时间，js 是单线程（主线程），防止阻塞，这些方法设计成异步（使用 callback 回调函数的形式处理内容）
> - nodejs 中的回调函数标准：（err, result）=> { 处理 result 的逻辑 }
> - 处理文件的方法都对应有一个同步方法，比如 readFileSync, writeFileSync。
> - 同步方法需谨慎使用，会阻塞线程，影响性能。通常只在程序初次运行的有限次数时使用，用于初始化
> - 为了兼容 es 新标准，fs 模块下新加了 promises 属性，从而可以使用新标准的异步函数的一些用法，比如 async, await。 减少回调函数的使用
>
> ```ts
> // promise 链式写法
> fs.promises.readFile(filepath, "utf-8").then((content) => {
>   console.log(content);
> });
>
> // es8新语法，promise语法糖写法
> async function newReadFile() {
>   const res = await fs.promises.readFile(filepath, "utf-8");
>   console.log(res);
> }
> newReadFile(); // hello node js
> ```

> **JavaScript 异步发展史**的三代核心技
>
> - 回调函数 → Promise → async/await
>
> - 总结如下
>
>   | 技术                     | 诞生时间                         | 出现原因 / 解决问题                                                                     |
>   | ------------------------ | -------------------------------- | --------------------------------------------------------------------------------------- |
>   | **回调函数（Callback）** | 最早，几乎从 JS 诞生（1995）就有 | JavaScript 是单线程的，要执行异步任务（如 `setTimeout`、`fs.readFile`）只能靠“回调函数” |
>   | **Promise**              | 2015 (ES6)                       | 解决“回调地狱（callback hell）”问题，让异步流程可链式调用、可捕获错误                   |
>   | **async/await**          | 2017 (ES8)                       | 让异步代码写起来像同步代码，更直观、易维护                                              |

- writeFile() - 向文件写入内容

```ts
import fs from "fs";
import path from "path";

// 获取文件的绝对路径
const filepath = path.resolve(__dirname, "./myFiles/file.txt");

// 方式1：
fs.writeFile(filepath, "hello world", () => {
  console.log("write file done 1");
});

// 方式2
fs.promises.writeFile(filepath, "hello new world").then(() => {
  console.log("write file done 2");
});

// 方式3
const newWriteFile = async () => {
  await fs.promises.writeFile(filepath, "hello hello");
  console.log("write file done 3");
};
newWriteFile();
```

> 一些其他配置
>
> - 默认编码方式是 utf-8, 也可以通过配置对象进行设置
> - 也可以写入 Buffer 格式的内容，常用语图片，音视频等的写入操作
> - 默认写入会替换原有内容，可配置成追加形式写入
> - 如果写入的文件不存在，或自动创建文件，并写入内容 （文件目录必须存在）
>
> ```ts
> // 复制一张图片
>
> const imgPath = path.resolve(__dirname, "./myFiles/pic.png");
> const newImgPath = path.resolve(__dirname, "./myFiles/pic2.png");
>
> const newWriteFile = async () => {
>   const buffer = await fs.promises.readFile(imgPath);
>   await fs.promises.writeFile(newImgPath, buffer, {
>     encoding: "utf-8", // 配置编码方式
>     flag: "a", // 配置写入方式 - 追加
>   });
>   console.log("copy done");
> };
> newWriteFile();
> ```

- stat() - 获取文件或者目录的信息

```ts
const test = async (path) => {
  const res = await fs.promises.stat(path);
  console.log(res);
};
test(imgPath);
```

```bash
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 98933537,
  size: 68611, //占用的字节数
  blocks: 256,
  atimeMs: 1762554835146.2834,
  mtimeMs: 1762554821001.8875,
  ctimeMs: 1762554833158.735,
  birthtimeMs: 1762554804428.301,
  atime: 2025-11-07T22:33:55.146Z, // 上一次访问的时间
  mtime: 2025-11-07T22:33:41.002Z, // 上一次修改的时间
  ctime: 2025-11-07T22:33:53.159Z, // 上一次改变文件状态的时间（访问权限等等）
  birthtime: 2025-11-07T22:33:24.428Z // 文件创建的时间
}
```

> 内置了方法，可以判断是文件还是文件夹
>
>     - isFile()
>     - isDirectory()

```ts
const test = async (path) => {
  const res = await fs.promises.stat(path);
  console.log(res);
  console.log(res.isFile()); // true
  console.log(res.isDirectory()); // false
};
test(imgPath);
```

- readdir() - 获取目录中的文件和子目录 (返回一个数组)

```ts
import fs from "fs";
import path from "path";

// 获取绝对路径
const dirpath = path.resolve(__dirname, "./myFiles");

const test = async (path: string) => {
  const res = await fs.promises.readdir(path);
  console.log(res);
};

test(dirpath);
```

```bash
[ 'dir', 'file.txt', 'pic.png', 'pic2.png' ] // 包括子文件夹（但不包括子文件夹里的文件）
```

- mkdir() - 创建目录

```ts
// ./myFiles下创建5个文件夹

// 获取绝对路径
const dirpath = path.resolve(__dirname, "./myFiles");

const test = async (path: string) => {
  for (let index = 1; index <= 5; index++) {
    await fs.promises.mkdir(dirpath + "/" + index);
  }
  const res = await fs.promises.readdir(path);
  console.log(res);
};

test(dirpath);
```

```bash
[
  '1',       '2',
  '3',       '4',
  '5',       'dir',
  'dir1',    'dir2',
  'dir3',    'dir4',
  'dir5',    'file.txt',
  'pic.png', 'pic2.png'
]
```

- ~~exists() - 判断文件或者目录是否存在, **已废弃**~~

使用 fs.stat()方法，可以自行封装一个

```ts
import fs from "fs";
import path from "path";

// 获取绝对路径
const dirpath = path.resolve(__dirname, "./myFiles");

const exists = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch (err) {
    // console.log(err);
    if (err.code === "ENOENT") {
      // 文件不存在
      return false;
    }
    throw err;
  }
};

const test = async (path) => {
  const res = await exists(path);
  if (res) {
    // dir 存在，不做任何操作
    console.log(" dir already exists");
  } else {
    // dir不存在，创建
    await fs.promises.mkdir(path);
    console.log("create dir done");
  }
};

test(dirpath);
```

#### 3. 练习 - 读取一个目录中的所以子目录和文件

每个目录或文件都是一个对象

- 属性
  - name - 文件名
  - ext - 后缀名
  - isFile - 是否是一个文件
  - size - 文件大小
  - createTime - 日期对象，创建时间
  - updateTime - 日期对象， 修改时间
- 方法
  - getChildren() - 得到目录所以子文件对象，如果是文件，则返回空对象
  - getContent(isBuffer=false) - 读取文件内容，如果是目录，则返回 null

```ts
import fs from "fs";
import path from "path";

interface IProps {
  filename: string;
  name: string;
  ext: string;
  isFile: boolean;
  size: number;
  createTime: Date;
  updateTime: Date;
}

class File {
  constructor(private props: IProps) {}

  static async getFile(filename: string) {
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const stat = await fs.promises.stat(filename);
    // console.log(stat);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = stat.birthtime;
    const updateTime = stat.mtime;
    return new File({
      filename,
      name,
      ext,
      isFile,
      size,
      createTime,
      updateTime,
    });
  }

  async getContent(isBuffer: boolean = false) {
    if (this.props.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.props.filename);
      } else {
        return await fs.promises.readFile(this.props.filename, "utf-8");
      }
    }
    return null;
  }

  async getChildren() {
    if (this.props.isFile) {
      return [];
    } else {
      let children = await fs.promises.readdir(this.props.filename);
      const childrenFiles = children.map((name) => {
        const newfilename = path.resolve(this.props.filename, name);
        return File.getFile(newfilename);
      });
      return Promise.all(childrenFiles);
    }
  }
}

const readDir = async (filename) => {
  const file = await File.getFile(filename);
  return await file.getChildren();
};

const test = async () => {
  const filename = path.resolve(__dirname, "./myFiles");
  const res = await readDir(filename);
  console.log(res);
  console.log(await res[0].getChildren());
};

test();
```

```bash
[
  File {
    props: {
      filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myFiles/1',
      name: '1',
      ext: '',
      isFile: false,
      size: 96,
      createTime: 2025-11-07T23:58:34.932Z,
      updateTime: 2025-11-08T10:26:52.755Z
    }
  },
  File {
    props: {
      filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myFiles/2',
      name: '2',
      ext: '',
      isFile: false,
      size: 64,
      createTime: 2025-11-07T23:58:34.932Z,
      updateTime: 2025-11-07T23:58:34.932Z
    }
  },
  File {
    props: {
      filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myFiles/file.txt',
      name: 'file.txt',
      ext: '.txt',
      isFile: true,
      size: 5,
      createTime: 2025-11-07T11:15:41.449Z,
      updateTime: 2025-11-07T22:39:33.579Z
    }
  },
  File {
    props: {
      filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myFiles/pic.png',
      name: 'pic.png',
      ext: '.png',
      isFile: true,
      size: 68611,
      createTime: 2025-11-07T22:33:24.428Z,
      updateTime: 2025-11-07T22:33:41.002Z
    }
  },
  File {
    props: {
      filename: '/Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/myFiles/pic2.png',
      name: 'pic2.png',
      ext: '.png',
      isFile: true,
      size: 1440831,
      createTime: 2025-11-07T22:37:48.903Z,
      updateTime: 2025-11-07T23:41:48.630Z
    }
  }
]
```

### 1-7 文件流

#### 1. 什么是流？

- 流是指数据的流动，数据从一个地方缓缓（一点一点）流动到另一个地方

  > 传输文件，尤其是大文件（如图片，音视频），避免一次性传输整个内容，而导致占用太多内存空间，我们希望数据能**一点一点向水流一下传输**

- 流是有方向的

  - 可读流 readable - 数据从源头（文件）流行内存
  - 可写流 writeable - 数据从内存流向源头（文件）
  - 双工流 duplex - 双向流动

#### 2. 为什么要使用流？

- 其他介质和内存的数据规模不一致

  > 就是空间大小不一致，磁盘可以存放大量数据，而内存空间通常很小。因此比如我们需要从磁盘里读取一个大文件到内存时，不能一下读取全部数据，而是希望一点一点读取，读一部分用一部分

- 其他介质和内存的数据处理能力不一致

  > 内存处理数据的能力非常快，而磁盘就慢很多。如果把内存处理好的数据一次性传输给磁盘，磁盘第处理能力无法快速处理完数据，导致磁盘卡顿

#### 3. node 中流的设计

node 中设计了流模块 stream， 里面封装了公共的 readable， writeable ，duplex 等等类。其他类型的流使用时，直接继承这些通用的公共的类

```ts
import stream from "stream";
console.log(stream);
```

```bash
{
  isDisturbed: [Function: isDisturbed],
  isErrored: [Function: isErrored],
  isReadable: [Function: isReadable],
  Readable: [Function: Readable] {
    ReadableState: [Function: ReadableState],
    _fromList: [Function: fromList],
    from: [Function (anonymous)],
    wrap: [Function (anonymous)]
  },
  Writable: [Function: Writable] { WritableState: [Function: WritableState] },
  Duplex: [Function: Duplex] { from: [Function (anonymous)] },
  Transform: [Function: Transform],
  PassThrough: [Function: PassThrough],
  pipeline: [Function: pipeline] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  addAbortSignal: [Function: addAbortSignal],
  finished: [Function: eos] {
    finished: [Function: finished],
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  destroy: [Function: destroyer],
  compose: [Function: compose],
  promises: [Getter],
  Stream: [Circular *1],
  _isUint8Array: [Function: isUint8Array],
  _uint8ArrayToBuffer: [Function: _uint8ArrayToBuffer]
}
```

#### 4. 文件流

- 什么是文件流

  内存数据和磁盘文件数据直接的流动

  > 比如，读取硬盘里的一个文件，将内容显示到控制台

#### 5. 文件可读流

- 可读流的创建

  - fs.createReadStream(path[, options])

  - 创建一个可读流，用于读取文件内容

  - path: 读取的文件的路径

  - options： 可选配置

    > - encoding - 编码方式，默认的是 buffer
    > - start - 起始字节
    > - end - 结束字节
    > - highWaterMark - 每次读取数量, 默认 64kb = 64x1024

  ```ts
  import path from "path";
  import fs from "fs";

  const filename = path.resolve(__dirname, "./myFiles/file.txt");

  const rs = fs.createReadStream(filename, {
    encoding: "utf8",
    start: 0,
    end: 100,
    highWaterMark: 1,
  });
  ```

- 返回值：Readable 的子类 ReadStream

  - 事件 - 返回的子类中，追加了事件注册方法，**rs.on ("事件名", 处理函数)，** 类似于 dom 里的事件注册

    - open - 文件打开事件，文件被打开，事件触发

    - error - 文件打开错误时触发

    - close - 文本关闭时触发

      > **如何关闭文件？？？** 1. 通过手动关闭 `rs.close()`， 2. 文件读取完成后会自动关闭

    - data - 获取文件流里数据的事件， 读取到一部分数据后触发

      > - 注册 data 事件后，才开始真正读取数据
      > - 每次读取 highWaterMark 指定的数量
      > - 回调函数中会附带读取到的数据

    - end - 数据读取完毕时触发

  ```ts
  rs.on("open", () => {
    console.log("file opend");
  });
  
  rs.on("data", (chunk) => {
    console.log("reading data:", chunk);
  });
  
  rs.on("end", () => {
    console.log("reading data done");
  });
  
  rs.on("close", () => {
    console.log("file colesd");
  });
  ```

  ```bash
  file opend
  reading data: h
  reading data: e
  reading data: l
  reading data: l
  reading data: o
  reading data:
  reading data: 你
  reading data: 好
  reading data done
  file colesd
  ```

  - 方法：返回的类，有 2 个读取数据流时使用到的方法
    - puase() - 暂停读取，会触发暂停事件
    - resume() - 恢复读取, 会触发恢复读取事件

  ```ts
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
  ```

  ```bash
  reading resumed
  file opend
  reading data: h
  reading puased
  reading resumed
  reading data: e
  reading puased
  reading resumed
  reading data: l
  reading puased
  reading resumed
  reading data: l
  reading puased
  reading resumed
  reading data: o
  reading puased
  reading resumed
  reading data:
  reading puased
  reading resumed
  reading data: 你
  reading puased
  reading resumed
  reading data: 好
  reading puased
  reading resumed
  reading data done
  file colesd
  ```

#### 6. 文件写入流

- 写入流的创建

  - createWriteStream(path[, options])

  - 创建一个写入流，用来写入内容到文件

  - path: 读取的文件的路径

  - options： 可选配置

    > - encoding - 编码方式，默认的是 utf8
    > - start - 起始字节
    > - highWaterMark - 每次能够写入的子节数, 默认 64kb = 64x1024

  ```ts
  const filename = path.resolve(__dirname, "./myFiles/file.txt");
  const ws = fs.createWriteStream(filename, {
    encoding: "utf-8",
    start: 0,
    highWaterMark: 100,
  });
  ```

- 返回值：Writeable 的子类 WriteStream

  - 事件

    - open
    - error
    - close
    - drain - 写入队列清空了

  - 方法

    - write(data) - 开始写入数据的方法

      > 1.  写入一组数据
      >
      > 2.  data 可以是字符串或 Buffer
      >
      > 3.  返回一个 boolean 值-
      >
      >     - true - 写入通道没有被填满，接下来的数据可以直接写入，无需排队
      >     - false - 写入通道目前已经被填满，接下来的数据将进入写入队列, 并在内存中排队
      >
      >     ```ts
      >     const filename = path.resolve(__dirname, "./myFiles/file.txt");
      >     const ws = fs.createWriteStream(filename, {
      >       encoding: "utf-8",
      >       start: 0,
      >       highWaterMark: 5,
      >     });
      >
      >     let flag = ws.write("a");
      >     console.log(flag); // true 写入通道没有被填满 1/5
      >     flag = ws.write("b");
      >     console.log(flag); // true 写入通道没有被填满 2/5
      >     flag = ws.write("c");
      >     console.log(flag); // true 写入通道没有被填满 3/5
      >     flag = ws.write("d");
      >     console.log(flag); // true 写入通道没有被填满 4/5
      >     flag = ws.write("e");
      >     console.log(flag); // false 写入通道已经填满 5/5
      >     flag = ws.write("f"); // 写入队列在内容从中排队
      >     console.log(flag); // false 写入通道已经填满 6/5
      >     ```
      >
      >     **特别注意：**要特别注意背压问题，因为写入队列是内存中的数据，是有限的。
      >
      >     由于我们的程序运行的速度非常快，导致通道被填满时，大量的写入队列在排队，导致阻塞
      >
      >     比如我们模拟写入 10M 的数据, 一定会导致背压的问题。
      >
      >     ```ts
      >     for (let index = 0; index < 1024 * 1024 * 10; index++) {
      >       ws.write("a");
      >     }
      >     ```
      >
      >     如何解决？？
      >
      >     可以利用 ws 的返回值，当 flag=true 时，继续写，而当 flag=false 时，暂停写入
      >
      >     ```ts
      >     let i = 0;
      >     // 一直写，知道到达上限，或无法再直接写入
      >     function write() {
      >       let flag = true;
      >       while (i < 1024 * 1024 * 10 && flag) {
      >         flag = ws.write("a"); // 写入a,得到下一次还能不能直接写的flag
      >         i++;
      >       }
      >     }
      >     write();
      >     ```
      >
      >     这样写满 5 次就停止写入了。但是如何能保证写入全部内容？？使用下面的事件
      >
      > 4.  当写入队列清空时，会触发 drain 事件（通道已清空）
      >
      >     ```ts
      >     ws.on("drain", () => {
      >       write(); // 管道清空了，继续写入
      >     });
      >     ```

    - end( [data] ) - 写入数据结束

      > 1. 结束写入，将自动关闭文件 - 是否关闭取决于 autoClose 配置，默认是 true
      > 2. data 是可选的，表示关闭前的最后一次写入

- 练习 - 使用读写流复制一个大文件（上面 10M 的文件为例）

  ```ts
  import path from "path";
  import fs from "fs";

  // 方式 1 - 普通文件读写
  async function method_1() {
    const from = path.resolve(__dirname, "./myFiles/file.txt");
    const to = path.resolve(__dirname, "./myFiles/file_copy.txt");
    console.time("method 1");
    const content = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, content);
    console.timeEnd("method 1");
    console.log("copy down");
  }
  method_1();

  // 方式 2 - 文件读写流的方式
  function method_2() {
    const from = path.resolve(__dirname, "./myFiles/file.txt");
    const to = path.resolve(__dirname, "./myFiles/file_copy.txt");
    // 创建文件读取流
    const rs = fs.createReadStream(from);
    // 创建文件写入流
    const ws = fs.createWriteStream(to);
    console.time("method 2");
    // 读取文件
    rs.on("data", (chunk) => {
      // 读取到一部分数据，开始写
      let flag = ws.write(chunk);

      if (!flag) {
        // 表示下次写入会造成被压, 读取暂停
        rs.pause();
      }
    });

    // 写入通道清空了，触发
    ws.on("drain", () => {
      // 继续读取
      rs.resume();
    });

    // 写入完成
    rs.on("close", () => {
      // 关闭写入流
      ws.end();
      console.timeEnd("method 2");
      console.log("copy down");
    });
  }

  method_2();
  ```

- 管道方法 - rs.pipe() 

    对于上面的使用文件流读写文件的方法method_2, 已经封装了管道方法（将读取流和写入流通过管道接通）

    - 将可读流连接到可写流
    - 返回参数的值
    - **该方法可以解决背压问题**

    ```ts
    // 方式 2 - 文件读写流的方式
    function method_2() {
      const from = path.resolve(__dirname, "./myFiles/file.txt");
      const to = path.resolve(__dirname, "./myFiles/file_copy.txt");
    
      const rs = fs.createReadStream(from);
    
      const ws = fs.createWriteStream(to);
      console.time("method 2");
     
      rs.pipe(ws); // 使用管道方法
        
      rs.on("close", () => {
        console.timeEnd("method 2");
        console.log("copy down");
      });
    }
    
    method_2();
    ```


### 1-8 net模块

#### 1. 回顾HTTP请求

HTTP的“连接模式”主要有以下几种：

- 普通模式 - 每一次请求都要建立一次 TCP 连接，请求完成后立即断开

    - 请求 → 建立连接 → 发送数据 → 关闭连接
    - 每次请求都重新建立 TCP 三次握手，效率较低
    - 传输结束后，还会进行 **四次挥手（Four-way Handshake）** 来关闭连接

    ```bash
    GET /index.html HTTP/1.0
    Connection: close
    ```

- 长连接模式 - 一个 TCP 连接可以发送多个请求和响应，不会在每次请求后立即断开。

    - 减少频繁建立 TCP 连接的开销
    - 提高性能、加快响应速度

    ```bash
    GET /index.html HTTP/1.1
    Connection: keep-alive
    ```

    

#### 2. net模块能干什么

- net是一个通信模块
- 利用它，可以实现：
    - 进程间的通信IPC
    - **网络通信 TCP/IP**

#### 3. 创建客户端

在node中主动创建一个请求到服务器

- 创建 - net.**createConnection**(options[,connectlistener])

```ts
import net from "net";

net.createConnection(
  {
    host: "duyi.ke.qq.com",
    port: 80,
  },
  () => {
    console.log("connection done");
  }
);
```

- 返回 - socket
    - socket   →TCP/IP连接 →远程主机
    - socket是一个特殊的文件，负责向应用程序（进程）和网络端口之间的通信数据
    - 在node中表现为一个双工流对象 - 可以像普通的流一样的操作（读取，写入数据）
    - 通过向流写入内容发生数据
    - 通过监听流的内容获取数据

```ts
import net from "net";

// 创建请求连接
const socket = net.createConnection(
  {
    host: "duyi.ke.qq.com",
    port: 80,
  },
  () => {
    console.log("connection done");
  }
);

// 写入流 - 向服务器发送数据
socket.write("hello", () => {
  console.log("send data to the server");
});

// 读取流 - 获取服务器的响应
socket.on("data", (chunk) => {
  console.log("data from server :", chunk.toString("utf8"));
});
```

```bash
connection done
send data to the server

data from server : 
// 响应行
HTTP/1.1 400 Bad Request
// 响应头
Date: Thu, 13 Nov 2025 01:31:19 GMT
Content-Type: text/html
Content-Length: 155
Connection: close

//响应体
<html>
<head><title>400 Bad Request</title></head>
<body>
<center><h1>400 Bad Request</h1></center>
<hr><center>TencentWAF</center>
</body>
</html>
```

data from server 内容就是服务器响应的HTTP协议规定格式的数据（响应行+响应头+响应体), 就是一个普通的字符串，只是平常开发中我们使用了一些工具进行格式转换成规定的格式。

**注意：** 为什么服务器给我们响应行内容是HTTP/1.1 400 Bad Request？ 因为我们发送的内容不是标准的Http协议规范的数据

> 符合Http协议规范的数据格式应该是：
>
> socket.write(`"请求行"
>
>   "请求头"
>
>   
>
>   "请求体"`, (**chunk**) **=>** {
>
>   console.**log**("send data to the server");
>
> });

重新发送标准的Http协议规范的数据

```ts
socket.write(
  `GET / HTTP/1.1
  Host: duyi.ke.qq.com
  Connetion:keep-alive

  `,
  () => {
    console.log("send data to the server");
  }
);
```



#### 4. 创建服务端

- 创建 - net.**createServer**()

```ts
import net from "net";

const server = net.createServer();
```

- 返回 - server对象
    - server.listen(port) - 监听端口
    - server.on("listening", ()=>{}) - 端口监听完成后触发（输出日志等等）
    - server.on("connection", socket=>{}) - 请求已经连接，数据通过socket传递给客户端

```ts
import net from "net";

const server = net.createServer();

server.listen(9527);

server.on("listening", () => {
  console.log("port is listening");
});

server.on("connection", (socket) => {
  console.log("server is conneted");
  socket.on("data", (chunk) => {
    console.log(chunk.toString("utf8"));
    socket.write(`HTTP/1.1 200 OK

      
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>`);

    socket.end();
  });

  socket.on("end", () => {
    console.log("server is close");
  });
});

```



## 2. mySql

## 3. 数据驱动和 ORM

## 4. Express.js

## 5. websocket
