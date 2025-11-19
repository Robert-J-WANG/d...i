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

  对于上面的使用文件流读写文件的方法 method_2, 已经封装了管道方法（将读取流和写入流通过管道接通）

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

### 1-8 net 模块

#### 1. 回顾 HTTP 请求

HTTP 的“连接模式”主要有以下几种：

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

#### 2. net 模块能干什么

- net 是一个通信模块
- 利用它，可以实现：
  - 进程间的通信 IPC
  - **网络通信 TCP/IP**

#### 3. 创建客户端

在 node 中主动创建一个请求到服务器

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
  - socket →TCP/IP 连接 → 远程主机
  - socket 是一个特殊的文件，负责向应用程序（进程）和网络端口之间的通信数据
  - 在 node 中表现为一个双工流对象 - 可以像普通的流一样的操作（读取，写入数据）
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

data from server 内容就是服务器响应的 HTTP 协议规定格式的数据（响应行+响应头+响应体), 就是一个普通的字符串，只是平常开发中我们使用了一些工具进行格式转换成规定的格式。

**注意：** 为什么服务器给我们响应行内容是 HTTP/1.1 400 Bad Request？ 因为我们发送的内容不是标准的 Http 协议规范的数据

> 符合 Http 协议规范的数据格式应该是：
>
> socket.write(`"请求行"
>
> "请求头"
>
> "请求体"`, (**chunk**) **=>** {
>
> console.**log**("send data to the server");
>
> });

重新发送标准的 Http 协议规范的数据

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

- 返回 - server 对象
  - server.listen(port) - 监听端口
  - server.on("listening", ()=>{}) - 端口监听完成后触发（输出日志等等）
  - server.on("connection", socket=>{}) - 请求已经连接，数据通过 socket 传递给客户端

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

### 1-9 http 模块

#### 1. 定义

`http` 是 Node 内置的 **基于 `net` 构建的 HTTP 服务器模块**。

- 无需手动管理 socket
- 无需手动组装消息格式

> net vs http:
>
> - **`net` 模块 = TCP 原生套接字编程**（底层、通用、没有协议），**`http` 模块 = 基于 `net` 封装出的 HTTP 协议服务器/客户端**（上层、带 HTTP 解析器）
>
> - `net` 模块用来创建最底层的网络连接。没有任何协议（就是纯粹的字节流），需要自己处理：
>
>   - 数据分包/粘包
>   - 请求格式
>   - 响应格式
>
>   快、底层、灵活
>
> - http 模块=net 模块基础上 + HTTP 协议解析器，每次 TCP 连接进来后，http 会用 _HTTP parser_ 去解析数据。它自动处理：
>
>   - HTTP 请求解析（method, headers, body）
>   - HTTP 响应封装（statusCode, headers）
>   - keep-alive
>   - 解析 chunked
>   - MIME 类型、Content-Length

#### 2. 客户端请求

- 创建 - [`http.request(url[, options\][, callback])`](https://nodejs.org/docs/latest/api/http.html#httprequesturl-options-callback)

  ```ts
  import http from "http";

  // 创建请求
  http.request("http://www.skykiwi.com/", { method: "POST" }, (resp) => {
    console.log(resp); // 响应结果,是一个Class: http.IncomingMessage 对象
  });
  ```

- 返回值 - Class: `http.ClientRequest`对象

  ```ts
  const request = http.request(
    "http://www.skykiwi.com/",
    { method: "POST" },
    (resp) => {
      console.log(resp);
      console.log("响应状态码", resp.statusCode);
      console.log("响应消息", resp.statusMessage);
      console.log("响应头", resp.headers);
      console.log("响应类型", resp.headers["content-type"]);
    }
  );

  console.log(request);
  ```

- 发送请求

  ClientRequest 对象相当于是一个可写流，我们可以通过可写流写入数据

  ```ts
  // 写入请求体内容
  request.write("Hello");
  // 请求结束
  request.end();
  ```

  ```bash
  响应状态码 200
  响应消息 OK
  响应头 {
    'accept-ranges': 'bytes',
    'cache-control': 'no-cache',
    'content-length': '29506',
    'content-type': 'text/html',
    date: 'Thu, 13 Nov 2025 23:23:10 GMT',
    p3p: 'CP=" OTI DSP COR IVA OUR IND COM ", CP=" OTI DSP COR IVA OUR IND COM "',
    pragma: 'no-cache',
    server: 'BWS/1.1',
    'set-cookie': [
      'BAIDUID=7B829C01DCC05A50BFA9AFD4FA3FBBB5:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com',
      ...
    ],
    tr_id: 'pr_0x9c7f58b6001e8209',
    traceid: '1763076190046453351411760687989786429393',
    vary: 'Accept-Encoding',
    'x-ua-compatible': 'IE=Edge,chrome=1',
    'x-xss-protection': '1;mode=block',
    connection: 'close'
  }
  响应类型 text/html
  ```

  注意：

  - 响应头的信息，可以在回调函数中通过 resp（http.IncomingMessage 对象）获得
  - **==响应体的信息==**，无法在回调函数中获取，node 认为响应体内容可长可短，如果太长，直接获取（需要放在内存）不合理。
  - 可以通过最基础的流形式获取

  ```ts
  // 创建请求
  const request = http.request(
    "http://www.baidu.com/",
    { method: "GET" },
    (resp) => {
      console.log("响应状态码", resp.statusCode);
      console.log("响应消息", resp.statusMessage);
      console.log("响应头", resp.headers);
      console.log("响应头类型", resp.headers["content-type"]);
  
      // 获取响应体
      let respBody = "";
      // 读取流
      resp.on("data", (chunk) => {
        respBody += chunk.toString("utf8");
      });
      resp.on("end", () => {
        console.log(respBody);
      });
    }
  );
  ```

  ```bash
  <!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta content="always" name="referrer" />
     ...
      <title>百度一下，你就知道</title>
      <style type="text/css">
          body {
              margin: 0;
              padding: 0;
              text-align: center;
              background: #fff;
              height: 100%;
          }
      ...
      </style>
  </head>
  <body>
      <div id="wrapper" class="wrapper_new">
   ...
      </div>
      <script type="text/javascript">
          var date = new Date();
          var year = date.getFullYear();
          document.getElementById('year').innerText = '©' + year + ' Baidu ';
      </script>
  </body>
  </html>
  ```

#### 3. 服务器响应

- 创建 - `http.createServer([options][, requestListener])`

  - options - 可选配置
  - requestListener - 监听函数，监听有没有请求来了， 2 个参数
    - `request` [<http.IncomingMessage>] 请求对象
    - `response` [<http.ServerResponse>] 响应对象

  ```ts
  import http from "http";

  http.createServer((req, res) => {
    // console.log("请求体对象", req);
    // console.log("响应体对象", res);
  });
  ```

- 返回值 - Server 对象

  ```ts
  import http from "http";

  const server = http.createServer((req, res) => {
    // console.log("请求体对象", req);
    console.log("请求路径", req.url);
    // console.log("响应体对象", res);
  });

  // 监听端口
  server.listen(9528);
  server.on("listening", () => {
    console.log("server is listening on 9528");
  });
  ```

  ```bash
  server is listening on 9528
  请求路径 /a/b/c?a=1&b=2
  ```

  结合其他模块，做一写操作。比如解请求路径对象

  ```ts
  import http from "http";
  import url from "url";

  const server = http.createServer((req, res) => {
    const pathObj = url.parse(req.url!);
    console.log(pathObj);
  });

  server.listen(9530);
  server.on("listening", () => {
    console.log("server is listening on 9530");
  });
  ```

  ```bash
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?d=1&e=2',
    query: 'd=1&e=2',
    pathname: '/a/bc/',
    path: '/a/bc/?d=1&e=2',
    href: '/a/bc/?d=1&e=2'
  }
  ```

- 请求内容获取

  ```ts
  import http from "http";
  import url from "url";

  function handleReq(req) {
    const pathObj = url.parse(req.url!);
    console.log("请求路径", pathObj);
    console.log("请求方法", req.method);
    console.log("请求头", req.headers);

    let reqBody = "";
    req.on("data", (chunck) => {
      reqBody += chunck.toString("utf-8");
    });
    req.on("end", () => {
      console.log("请求体", reqBody);
    });
  }

  const server = http.createServer((req, res) => {
    //请求体信息
    handleReq(req);
  });

  server.listen(9530);
  server.on("listening", () => {
    console.log("server is listening on 9530");
  });
  ```

  ```bash
  请求路径 Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?d=1&e=2',
    query: 'd=1&e=2',
    pathname: '/a/bc/',
    path: '/a/bc/?d=1&e=2',
    href: '/a/bc/?d=1&e=2'
  }
  请求方法 GET
  请求头 {
    'content-type': 'text/plain',
    'user-agent': 'PostmanRuntime/7.43.3',
    accept: '*/*',
    'postman-token': '251e7eeb-e2bb-4254-a23e-8d345b54f8bc',
    host: 'localhost:9530',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
    'content-length': '7'
  }
  请求体 a=1&b=2
  ```

- 响应内容设置

  ```ts
  import http from "http";
  import url from "url";
  
  function handleReq(req) {
   ...
  }
  
  function handlerRes(res) {
    res.setHeader("a", 1);
    res.setHeader("b", 1);
    res.statusCode = 404;
  
    res.write("hello");
    res.end();
  }
  
  const server = http.createServer((req, res) => {
    // 请求数据获取
    handleReq(req);
  
    // 响应体对象设置
    handlerRes(res);
  });
  
  server.listen(9530);
  server.on("listening", () => {
    console.log("server is listening on 9530");
  });
  ```

**总结：**

- 我是客户端
  - 请求：ClientRequest 对象 - 我发给别人（服务器）的
  - 响应：IncomingMessage 对象 - 别人（服务器）给我的，正在来的数据
- 我是服务器
  - 请求：IncomingMessage 对象 - 别人（客户端）给我的，正在来的数据
  - 响应：ServerResponse 对象 - 我发给别人（客户端）的

#### 4. 练习 - 搭建一个静态资源服务器

node 环境中读取今天资源的内容（html/js/css),作为服务器响应结果返回

```ts
// 静态资源服务器

// http://localhost:9527/index.html -> public/index.html
// http://localhost:9527/css/index.css -> public/css/index.css
```

```ts
import http from "http";
import URL from "url";
import path from "path";
import fs from "fs";

const getStat = async (filename) => {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
};

const getFileInfo = async (url) => {
  const urlObj = URL.parse(url);
  // 文件资源的绝对路径
  let filename = path.resolve(
    __dirname,
    "public",
    urlObj.pathname!.substring(1)
  );
  let stat = await getStat(filename);
  if (!stat) {
    // 文件不存在
    return null;
  } else if (stat.isDirectory()) {
    // 文件是目录
    filename = path.resolve(__dirname, "public", filename, "index.html");
    stat = await getStat(filename);

    // 目录里没有此文件
    if (!stat) {
      return null;
    } else {
      // 目录里有此文件
      console.log(filename);
      return await fs.promises.readFile(filename);
    }
  } else {
    // 正常文件
    return await fs.promises.readFile(filename);
  }
};

const handleServer = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const fileInfo = await getFileInfo(req.url);
  if (!fileInfo) {
    res.statusCode = 404;
    res.write("not found");
  } else {
    res.write(fileInfo);
  }

  res.end();
};

const server = http.createServer(handleServer);

server.listen(9527);
server.on("listening", () => {
  console.log("server is runing on port 9527");
});
```

### 1-10 https 协议

#### 1. 概述

- **HTTPS** (Hypertext Transfer Protocol Secure) 实际上就是在 **HTTP**（普通的网页传输协议）的基础上，加上了 **TLS/SSL** 加密层。

- HTTPS 能来保证数据在传输过程中不被窃取和篡改

  > HTTP 的问题:
  >
  > - HTTP 传输数据是**明文**的，任何中间人（比如公共 Wi-Fi 的管理者、网络运营商或黑客）都可以看到和篡改
  >
  > HTTPS 的解决：
  >
  > - HTTPS 使用 **TLS/SSL** 技术对您浏览器和网站服务器之间传输的所有数据进行加密。中间人即使截获了数据包，看到的也只是一堆**乱码**，无法解读。

#### 2. **加密机制**

HTTPS 的核心——**加密机制**，它同时使用两种主要的加密方式：**非对称加密**（公钥/私钥）和**对称加密**。

- 对此加密

  - 产生一个密钥，可以用来加密，也能又用来解密
  - 加密过程： 原始信息+密钥 = 加密信息
  - 解密过程： 加密信息+密钥 = 原始信息
  - 常用的算法： DES, 3SES, AES, Blowfish 等等

  **问题： 密钥传递时，也可能会被窃取和篡改，从而会对原始信息进行破坏**

- 非对称加密

  - 产生一对密钥，一个用于加密，一个用于解密 （公钥+私钥）
  - 公钥一般是公开的，任何人都可以获取；私钥则不能随便获取
  - 加密过程： 原始信息 + 公钥 = 加密信息
  - 解密过程 ：加密信息 + 私钥 = 原始信息
  - 常用算法： RSA, Elagmal, Rabin, D-H, ECC 等等

  **问题： 如果服务器不传递私密的话，客户端接收的信息无法解密**

- HTTPS 加密机制

  非对称加密和对称加密结合使用

  - 传递密钥阶段
    1. 服务端先传递公钥(key_pub)给客户端,自己保留私钥(key_prt)
    2. 客户端在本地生成一个对称加密的密钥(key)，使用公钥对这个对称密钥加密，生成新的密钥（key_new), 并传递给服务端
    3. 服务端使用私钥（key_prt）解密密钥（key_new），得到解密后的称加密的密钥(key)
    4. 从此，只有服务端和客户端知道对称加密的密钥(key)， 而传输这个密钥的过程不会泄露，因为传输的的使用公钥加密后的，只能使用私密来解密
  - 传递数据阶段
    1. 客户端使用对称加密的密钥(key)**加密数据**并传递。
    2. 服务端使用对称加密的密钥(key)解密数据。

- 总结：
  - **非对称加密**（公钥/私钥）用于**安全地协商/传输**那个秘密的**对称密钥**。
  - 一旦密钥就位，后续所有的实际数据都使用**对称加密**进行**快速传输**。
  - 只保证数据在**传输过程**中的安全， 不涉及数据存储的安全性

#### 3. 中间人攻击问题

上面使用 2 中加密的结合，还是有可能被窃取和篡改。

- 服务端传递公钥(key_pub)给客户端时，被第三方拿到。第三方替换为自己生产的伪公钥（key_pub_feak)，并传递地客户端
- 客户端不知情，使用伪公钥（key_pub_feak)加密对称密钥(key)，生成新的伪密钥（key_new_feak),并传递出去
- 第三方拿到伪密钥（key_new_feak)，并使用自己的伪私钥（key_prt_feak)解密，知道了客户端的对称密钥(key)
- 同时，第三方伪造一个自己的伪对称密钥（key_feak), 并使用服务端传递的公钥(key_pub)加密自己的伪对称密钥（key_feak)，生成一个新的伪密码（key_new_feak_2),并传递给服务端
- 此时服务端不知情，并使用私钥 key_prt 解密，得到了伪对称密钥（key_feak)
- 之后服务端使用伪对称密钥（key_feak)加密数据，第三方则能使用伪对称密钥（key_feak)能解密数据

**结果：**

- **客户端**和**中间人**共享 `key`。
- **服务器**和**中间人**共享 `key_feak`。

- 从此数据别窃取并可能篡改

#### 4. 证书和身份验证

为了在 **“公钥传递”** 这一步，**证明这个公钥是合法的服务器的，而不是中间人的**。因此，我们需要**权威证书颁发机构 (CA)** 签发的 **SSL/TLS 证书**，对公钥进行包装。

- 证书的生成（CA 的核心工作）

  CA 的工作不是加密，而是 **“担保”**，通过 **数字签名** 来实现。

  - **服务器生成密钥对：** 服务器首先生成它自己的**公钥** (`Key_server_pub`) 和 **私钥** (`Key_server_prt`)。
  - **提交 证书签名请求（CSR）：**服务器将域名和 `Key_server_pub` 等其他信息文件提交给 CA，请求签名。
  - **计算指纹：** CA 对提交的文件计算出一个独一无二的 **“校验码” (指纹 A)**。
  - **私钥加密：** CA 使用**自己秘密保管的私钥**对指纹 A 进行加密，生成一个 **“防伪标记”**（即数字签名）。
  - 颁发证书：证书包含文件信息（未加密）和这个 **防伪标记**（已加密）。

- 验证流程

  - 客户端收到服务器发来的证书
  - 从内置的、可信任的根库中，找到 CA 的**公钥**
  - 使用这个公钥去解密防伪标记，成功得到 **CA 当初计算的校验码 (指纹 A)**。（如果解密失败，说明这个标记是假冒的，连接中断。）
  - 验证完整性 (计算 B)：客户端独立地对**当前收到的证书文件重新计算（使用通用的算法，证书里标明）校验码，得到 **自己算的校验码 (**指纹 B**)。
  - 最终对比： **如果 A = B：** 验证通过！这证明证书是 **“原件”**（没有被篡改）且 **“身份真实”**（只有 CA 的私钥能生成 A），**如果 A ≠ B：** 验证失败！说明证书内容被篡改，连接中断。

### 1-11 https 模块

#### 1. 服务器结构

- 普通服务器结构

  浏览器 **⇌** nginx: https/443 ⇌ node:http / 9527

- 本节练习的服务器结构

  浏览器 **⇌** node: https/443 ， 这种结构实际生产中不常用

#### 2. 模拟证书准备 - 了解

- 方式 1：网上购买权威机构证书（实际生产中使用）

- 方式 2：本地生产证书（模拟练习使用）， 自己作为权威机构发布证书

  - 安装 openssl

    - 下载源码，自行构建
    - 下载 Windows 安装包
    - Mac 系统自带 openssl
    - 通过终端输入命令 openssl 测试

  - 生成 CA 私钥

    ```bash
    openssl genrsa -des3 -out ca-pri-key.pem 1024
    ```

    - genrsa ： 密钥对生成算法
    - -des3 ：使用对称加密算法 des3 对私钥进一步加密
    - -out ca-pri-key.pem : 将加密后的私钥保存到当前目录下的 ca-pri-key.pem 文件中
    - 1024 ：私钥的子节数

  - 生成 CA 公钥（证书请求）

    ```bash
    openssl req -new -key ca-pri-key.pem -out ca-pub-key.pem
    ```

  - 生成 CA 证书

    ```bash
    openssl x509 -req -in ca-pub-key.pem -signkey ca-pri-key.pem -out ca-cert.
    ```

  +++++++++++++++++++分割线+++++++++++++++++++++++

  - 生成服务器私钥

    ```bash
    openssl genrsa -out server-key.pem 1024
    ```

  - 生成服务器公钥

    ```bash
    openssl req -new -key server-key.pem -out server-scr.pem
    ```

  - 生成服务器证书

    ```bash
    openssl x509 -req -CA ca-cert.crt -CAkey ca-pri-key.pem -CAcreateserial in server-scr.pem -out server-cert.crt
    ```

#### 3. https 模块

- 模拟使用上一节练习的静态资源服务器

- 替换 http 模块为 https 模块

- 创建 server 时添加配置对象, 并修改 https 默认的端口 443

  ```ts
  const server = https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, "./server-key.pem")), // 服务器私钥
      cert: fs.readFileSync(path.resolve(__dirname, "./server-cert.crt")), // 服务器私证书
    },
    handleServer
  );

  server.listen(443);
  server.on("listening", () => {
    console.log("server is runing on port 443");
  });
  ```

- 运行服务器，并在浏览器中打开 https://localhost/ 进行测试

### 1-12 <font color="gray">node 生命周期 - 了解</font>

### 1-13 eventEmitter

#### 1. 概述

- _EventEmitter 是 Node.js 中用于创建、注册和触发事件的核心模块_。
- 它允许对象发布（`emit`）事件，并让其他对象（监听器）订阅（`on`）这些事件，并在事件发生时执行预先定义的回调函数。它实现了 **发布/订阅** 模式和 **观察者模式**。
- 在不直接引用彼此的情况下，让不同的模块通过事件进行通信。

#### 2. 创建

```ts
import { EventEmitter } from "events";

const event = new EventEmitter();
event.on("hello", () => {
  // 注册事件
  console.log("hello");
});

event.emit("hello"); // 触发事件
```

可以注册多个事件，可以多次触发

```ts
import { EventEmitter } from "events";

const event = new EventEmitter();
event.on("hello1", () => {
  console.log("hello1");
});

event.on("hello2", () => {
  console.log("hello2");
});

event.on("hello3", () => {
  console.log("hello3");
});

event.emit("hello1");
event.emit("hello2");
event.emit("hello3");
```

如何实现的？

- 它内部维护多个事件队列，类型一个数组 - 事件是数组的成员，依次触发这些事件

#### 3. 功能

- **事件监听和注册：** 使用 `on()` 或 `addListener()` 方法来注册一个回调函数，用于监听特定的事件。
- **事件触发：** 使用 `emit()` 方法来触发一个特定的事件，这将调用所有注册到该事件的监听器。
- **参数传递：** 在触发事件时，可以向监听器传递参数。
- **移除监听器：** 使用 `removeListener()` 方法可以移除特定的监听器。
- **一次性监听器：** 使用 `once()` 方法可以注册一个只在事件触发一次后自动移除的监听器。
- **错误事件：** `EventEmitter` 有一个特殊的 `error` 事件，当发生错误时会自动触发。如果未绑定 `error` 事件的监听器，程序可能会退出。

#### 4. 练习

利用 eventEmitter 的注册和监听事件功能，封装一个 http 请求的类，监听 res 事件，可以直接拿到相应结果（响应头和响应体）

```ts
import { EventEmitter } from "events";
import http from "http";

export class MyRequest extends EventEmitter {
  constructor(private url, private options = {}) {
    super();
  }

  send(body = "") {
    const request = http.request(this.url, this.options, (res) => {
      let result = "";
      res.on("data", (chunck) => {
        result += chunck.toString("utf-8");
      });

      res.on("end", () => {
        this.emit("res", res.headers, result);
      });
    });

    request.write(body);
    request.end();
  }
}
```

使用 MyRequest

```ts
import { MyRequest } from "./myRequest";

const request = new MyRequest("http://www.baidu.com/");

request.send();
request.on("res", (headers, result) => {
  console.log(headers);
  console.log(result);
});
```

## 2. mySql

### 2-1 数据库简介

#### 1. 数据库能干什么

- 持久的存储数据
- 备份和恢复数据
- 快速存取数据
- 权限控制

#### 2. 数据库的类型

- 关系型数据库

  - 特点 - 以表和表关联构成的数据结构

  - 优点 - 能表达复杂的数据关系；强大的查询语言，尤其是海量数据的读写
  - 缺点 - 数据结构比较死板
  - 用途 - 存储结构复杂的数据
  - 代表 - Oracle / MySql / Sql Server

- 非关系型数据库

  - 特点 - 以极其简单的解构存储数据， 比如文档型，键值对型

  - 优点 - 格式灵活；海量数据读效率高
  - 缺点 - 难以表达复杂的数据关系；对于复杂查询，效率不好
  - 用途 - 存储结构简单的数据
  - 代表 - MongoDB / Redis / Membase

- ~~面向对象数据库 - 略~~

#### 3. 术语

- DB - database 数据库
- DBA - database administer 数据库管理员
- DBMS - database management system 数据库管理系统
- DBS - database system 数据库系统

### 2-2 MySql 的安装

通过 docker 安装 mysql，并结合 Navicat 工具管理。同时实现数据持久化

#### 1. 拉取 MySQL 镜像

从 Docker Hub 拉取官方的 MySQL 镜像。推荐使用特定版本号以保持环境稳定。

```bash
docker pull mysql:8.0
```

#### 2. 创建本地持久化目录：

在 Docker 中运行数据库，数据持久化是**至关重要**的一步，以确保即使容器被删除，数据也不会丢失。

实现数据持久化最常用的方法是使用 **Docker 卷（Volume）**，首先，创建用于持久化 MySQL 数据的本地目录

```bash
mkdir -p /Users/aqiang/docker/mysql-data
```

#### 3. 运行 MySQL 容器，并实现数据的持久化

使用 `docker run` 命令启动 MySQL 容器， 并将本地目录挂载到容器的 `/var/lib/mysql`，实现数据持久化。

```bash
docker run --name mysql-study \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3306:3306 \
-v /Users/aqiang/docker/mysql-data:/var/lib/mysql \
-d mysql:8.0
```

| **参数**                                              | **含义**                                                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `--name mysql-study`                                  | 容器命名为 `mysql-study`，方便管理和停止。                                                                         |
| `-e MYSQL_ROOT_PASSWORD=...`                          | **环境变量：** 设置 `root` 用户的密码。                                                                            |
| `-p 3306:3306`                                        | **端口映射：** 将容器内部的 3306 端口映射到主机上的 3306 端口。这样可以通过 `localhost:3306` 来连接数据库。        |
| `-d`                                                  | **后台运行 (Detached)：** 让容器在后台持续运行。                                                                   |
| `-v /Users/aqiang/docker/mysql-data:/var/lib/mysql \` | 使用 `-v` 参数将本地目录(`/Users/aqiang/docker/mysql-data`) 挂载到容器内部的 `/var/lib/mysql` 目录，实现数据持久化 |
| `mysql:8.0`                                           | 指定要运行的镜像版本。                                                                                             |

命令行操作

```bash
docker exec -it mysql-study mysql -uroot -p123456
```

查看编码字符配置

```bash
mysql> SHOW VARIABLES LIKE 'character_set%';
```

```bash
+--------------------------+--------------------------------+
| Variable_name            | Value                          |
+--------------------------+--------------------------------+
| character_set_client     | latin1                         |
| character_set_connection | latin1                         |
| character_set_database   | utf8mb4                        |
| character_set_filesystem | binary                         |
| character_set_results    | latin1                         |
| character_set_server     | utf8mb4                        |
| character_set_system     | utf8mb3                        |
| character_sets_dir       | /usr/share/mysql-8.0/charsets/ |
+--------------------------+--------------------------------+
8 rows in set (0.09 sec)
```

查看数据库

```
mysql> show databases;
```

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

退出

```bash
exit
```

修改配置, 使用 docker-compose.yml, 方便统一管理更新配置

```yaml
services:
  mysql:
    container_name: mysql-study
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "123456"
    ports:
      - "3306:3306"
    volumes:
      - /Users/aqiang/docker/mysql-data:/var/lib/mysql
      - /Users/aqiang/docker/mysql-data/config/my.cnf:/etc/mysql/conf.d/my.cnf # 可选：自定义配置文件挂载

volumes:
  mysql-data:
```

```cnf
// /Users/aqiang/docker/mysql-data/config/my.cnf

[mysqld]
# --- 服务器端字符集配置 ---
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci

[mysql]
# --- 客户端命令行默认字符集配置 ---
default-character-set = utf8mb4

[client]
# --- 客户端通用配置 ---
default-character-set = utf8mb4
```

停止容器

```bash
docker-compose down
```

重启

```bash
docker-compose up -d
```

#### 4. 使用图形化工具

使用任何图形化客户端（如 DBeaver、Navicat 等）连接到 Docker 上的 MySQL：

| **配置项**          | **值**                     |
| ------------------- | -------------------------- |
| **主机 (Host)**     | `localhost` 或 `127.0.0.1` |
| **端口 (Port)**     | `3306`                     |
| **用户 (User)**     | `root`                     |
| **密码 (Password)** | 123456                     |

#### 5. 验证和管理

- 检查容器状态： `docker ps`

- 停止容器（数据保留）： `docker stop mysql`

- 启动容器（数据恢复）： `docker start mysql`

### 2-3 数据库设计

#### 1. SQL

- Structured query language 结构化查询语言
- 大部分关系型数据库，拥有基本一致的 SQL 语法
- 分支
  - DDL - data definition language 数据定义语句 - 操作数据库对象，包括
    - 库
    - 表
    - 视图
    - 存储过程
  - DML - data manipulation language 数据操控语句 - 操作数据库中的记录 （某一行数据的增删改查）
  - DCL - data control language 数据控制语言 - 控制用户权限

#### 2. 管理库

- 创建库

  ```sql
  CREATE DATABASE test
  ```

- 切换库

  ```sql
  SHOW DATABASES; // 显示数据库列表
  USE test; // 切换库
  ```

- 删除库

  ```sql
  DROP DATABASE test;
  ```

#### 3. 管理表

管理表之前，先切换到当前的数据库

- 创建表 - **CREATE TABLE**

  - 字段名
  - 字段类型
    - bit - 占 1 位，0 或 1，false 或 true
    - int - 占 32 位，整数
    - decimal（M,N) - 能精确计算的实数。M 是总的数字位数，N 是小数位数
    - char(n) - 固定长度位 n 的字符
    - ==**varchar(n) - 长度可变，最大长度位 n 的字符**==
    - text - 大量的字符
    - date - 仅日期
    - datetime - 日期+时间
    - time - 仅时间
  - 是不是 null - 必填？是不是有值？
  - 自增 - 数字自增的话，必须要设置主键
  - 默认值

  ```sql
  CREATE TABLE `students`  (
    `sudtno` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `dob` date NOT NULL,
    `sex` bit NOT NULL DEFAULT 1,
    `address` varchar(255) NULL,
    PRIMARY KEY (`sudtno` DESC)
  );
  ```

- 修改表 - **ALTER TABLE**

  比如添加一个字段 ADD COLUMN

  ```sql
  ALTER TABLE `students`
  ADD COLUMN `email` varchar(255) NOT NULL AFTER `address`;
  ```

  删除一个字段 DROP COLUMN

  ```sql
  ALTER TABLE `students`
  DROP COLUMN `email`;
  ```

- 删除表 - DROP TABLE

  ```sql
  DROP TABLE students;
  ```

#### 4. 主键和外键

- 主键

  - 根据设计原理，每张表都必须要求主键，保证数据的唯一性

  - 主键必须满足如下要求：

    - 唯一
    - 不能更改
    - 无业务含义

    因此，上面表格中的 student no. 不能作为主键，需重新设计表格（增加 ID 作为主键）

  ```sql
  ALTER TABLE `students`
  ADD COLUMN `id` int NOT NULL AUTO_INCREMENT FIRST,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (`id`) USING BTREE;
  ```

  可以使用内置的函数 uuid(), 获得唯一的 id

- 外键

  - 用来产生表关系的列
  - 外键列会连接到另一张表（或自己）的主键

  关系型数据库中，有多张表格，表格直接往往存在着关系，外键可以来连接有关系的表。

  > 比如：我们已经有了上面的学生表，表里缺少班级或者课程的信息。我们可以再设计一张班级的表格，并给学生表添加班级字段，同时使用外键连接到班级表

  创建班级表

  ```sql
  CREATE TABLE `class`  (
    `ID` int NOT NULL AUTO_INCREMENT,
    `class_name` varchar(255) NOT NULL,
    `create_time` datetime NOT NULL,
    PRIMARY KEY (`ID`)
  );
  ```

  修改学生表 - 添加班级 id 字段，并使用外键关联班级表

  ```sql
  ALTER TABLE `students`
  ADD COLUMN `class_id` int NOT NULL AFTER `email`;
  ```

  ```sql
  ALTER TABLE `students`
  ADD FOREIGN KEY (`class_id`) REFERENCES `test`.`class` (`ID`);
  ```

#### 5. 表关系

- 一对一
  - 一个 A 对应一个 B，同时一个 B 对应一个 A
  - 例如：用户和用户信息
  - 把任意一张表的主键同时设置为外键
- 一对多
  - 一个 A 对应多个 B， 同时一个 B 对应一个 A，A 和 B 是一对多，B 对 A 是多对一
  - 例如：班级和学生， 用户和文章
  - 在多的一端的表中设置外键，对应到另一张表的主键
- 多对多
  - 一个 A 对应多个 B， 同时一个 B 对应多个 A
  - 例如：学生和老师
  - 需要新建一张关系表，关系表至少包含两个外键，分别对应到两张表

#### 6. 三大范式设计

- 要求数据库表的每一列都是不可分割的原子数据项
- 非主键列必须依赖于主键列
- 非主键列必须直接依赖于主键列

### 2-4 表记录的增删改

对应表中数据记录的操作，通用使用DML（data manipulation language）数据操控语言，CRUD

- CREATE - 增

    **`INSERT INTO`**

    增加一条记录 

    ```sql
    INSERT INTO student (sudtno, `name`, dob, sex, address, email, class_id)
    VALUES
    (3, 'lee', '2000-1-1', 1, '100 newnorth road, Mt Albert', 'leelee@gmail.com', 1);
    ```

    增加多条记录

    ```sql
    INSERT INTO student (sudtno, `name`, dob, sex, address, email, class_id)
    VALUES
    (3, 'PAR', '2002-1-2', 1, '101 newnorth road, Mt Albert', 'PAR@gmail.com', 1),
    (3, 'JAY', '2003-1-3', 1, '102 newnorth road, Mt Albert', 'JAY@gmail.com', 2),
    (3, 'KEN', '2004-1-4', 1, '188 newnorth road, Mt Albert', 'KEN@gmail.com', 2);
    ```

- RETRIEVE - 查

- UPDATE - 改

    **`UPDATE SET`**

    ```sql
    -- 修改记录
    UPDATE student
    SET `name` = 'ches'
    WHERE id = 1;
    	
    UPDATE student
    SET address = '111 newsouth road, Mt Roskill',
    email = 'ches@gmail.com'
    WHERE id = 1;
    ```

- DELETE - 删

    **`DELETE FROM`**

    ```sql
    -- 删除表记录
    DELETE
    FROM
    	student
    WHERE
    	id = 7
    ```

    

### 2-5 表单基本查询

### 2-6 联表查询

### 2-7 函数和分组

### 2-8 视图

## 3. 数据驱动和 ORM

## 4. Express.js

## 5. websocket
