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

- ~~parse()： 将一个 URL 字符串解析为一个 URL 对象~~  **已废弃**

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

    这样我们经常将旧版本的callback形式转换成promise形式，进而可以使用es新标准的语法糖 async, await

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

    

## 2. mySql

## 3. 数据驱动和 ORM

## 4. Express.js

## 5. websocket
