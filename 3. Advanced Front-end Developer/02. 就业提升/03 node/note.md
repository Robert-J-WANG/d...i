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

#### 3.  前置课程

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

    - 使用require函数，根据绝对路径直接加载模块

    - 注意： 其他的路径写法，最终都会转换成绝对路径加载模块

- 相对路径 ./ 或者../ 

    - 这种写法，常用于加载我们自定义的模块

    - 相对于当前模块

    ```ts
    require("./myModules/a.ts");
    ```

- 相对路径 

    - 常用于加载内置模块，或者包管理器下载的第三方库模块（node_modules里）

    ```ts
    require("myModules/a.ts"); // 会导入node_modules里我们自定义的 myModules/a.ts 模块
    ```

    查找顺序如下：

    - 检查是否是内置模块，如：fs, path等
    - 检查当前目录中的node_modules
    - 检查上级目录中的node_modules

- 关于后缀名

    - 如果不写后缀名，会自动补全
    - 常见的模块后缀：js, ts, json, node, mjs等

- 关于文件名

    - 如果仅提供目录， 不提供文件名，则自动查找该目录中的index.js（index.ts)

    ```ts
    require("./myModules"); // 相当于查找 "./myModules/index.ts"
    ```

- 关于package.json中的main字段
    - 表示包的默认入口
    - 导入或者执行包时，若仅提供目录，则使用main字段的值补全入口
    - 默认值为index.js

#### 2. module对象

**`module` 对象代表当前正在执行的模块本身。**
它包含了关于这个模块的元信息（例如文件路径、导出内容、依赖等），并且与 `exports`、`require`、`__filename`、`__dirname` 等共同构成 Node.js 的模块系统基础。

```ts
// ./myModules/a.ts
console.log(module); // ./myModules/a.ts这个模块的元信息

// ./index.ts
require("./myModules/a.ts")
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

#### 3. require函数

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

- resolve的使用

    ```ts
    const path = "./index.ts";
    console.log(require.resolve(path)); // 解析成绝对路径
    ```

    ```bash
    Users/aqiang/Desktop/myGitHub/upload/duyi/3. Advanced Front-end Developer/02. 就业提升/03 node/code/src/index.ts
    ```

- 其他的静态属性和方法了解一下

#### 4. 模块执行原理

当执行一个模块，或者使用require函数时，会将模块放置于一个函数环境中，放置污染全局变量

Node 内部会用一个函数包装模块代码：

```js
(function(exports, require, module, __filename, __dirname) {
  // 模块源代码
});

```

这就是为什么：

- 每个模块都有 `exports`、`module`、`require`、`__dirname`、`__filename`
- 但它们看似“全局变量”，其实是函数作用域内传进来的参数。

### 1-4 node中的ES模块化

#### 1. 问题

- 与 Node.js 长期使用的 CommonJS 模块化存在不兼容问题， 有些问题还在持续优化
- 目前node中的ES模块化仍然处于试验阶段

#### 2. 使用

- 一个项目中的模块，要么是commonjs，要么是es, 不要混用

- Commonjs : 默认情况下，都是commonjs。 一些第三方库都是用commonjs编写的，为了兼容这些第三方库，node的模块化默认使用commonjs
- ES模块化的实现方式
    - 将文件名改为mjs
    - 或者在里模块层级最近的一个package.json里设置 **"type"**: "module"

#### 3. 结合ts

如果结合ts的话，不用做上面的设置，代码的编写允许用 ESM 写法，但会编译成 CommonJS

```ts
// ./myModules/a.ts
export const obj = { a: 1, b: 2 };
```

```ts
// ./index.ts
import {obj} from "./myModules/a";
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

编译的结果 ：commonjs标准

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

#### 2. path 模块

#### 3. url 模块

#### 4. util模块

## 2. mySql

## 3. 数据驱动和 ORM

## 4. Express.js

## 5. websocket
