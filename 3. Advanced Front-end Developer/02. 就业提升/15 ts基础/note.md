## ts 基础

### part-1 概述

#### 为什么要使用ts?
- 获得更好的开发体验
- 解决js中的一些问题

#### js开发中常见的问题：
- 使用了不存在的变量，函数或者成员（比如写错了名称等等）
- 变量类型的错误：把不确定的类型当成确定的类型使用
- 使用了null/undefined成员
``` js
  const a = undefined;
  console.log(a.name);
  
  // TypeError: Cannot read properties of undefined (reading 'name')

```
js原罪：
- js本身设计时的特点，导致其不能适用大型复杂的项目（设计之初仅仅是为了一些简单的网页交互效果）
- 弱类型：某个变量，可以随时变化类型
```js
  let width=500
  //...
  width="500px"
  //...
  document.getElementById("xxx").style.width=width+"px" // width类型变化了，已经不是数字了，所以报错

```
- 解释型语言：看一段代码运行一段，只有全部代码都运行了，才能知道哪里有错误。vs编译型语言：编译的过程中就能发现错误，而不需要运行完整代码

因此，导致前端开发中，大部分时间都在调试错误

#### TS
ts是js的一个超集， 是一个可选的，静态的类型系统
- 超集： ts包含了所有js的内容
- 类型系统： 对代码中所有的标识符（变量，函数，参数，返回值等等）进行了类型约束和检查
- 可选的： 不影响原有的js功能，可选择使用，学习曲线平缓
- 静态的： 在代码编译时就进行类型检查，避免错误的代码运行时才发现
    > 无论是浏览器环境还是node环境，都无法直接识别ts，需要一个编译器，把ts代码转换成js代码
    > babel:将es6转换成es5，让低版本的浏览器识别
    > tsc: 将ts编译成js,让浏览器和node环境识别
    ts 不参与任何代码运行时的类型检查  

**TS常识**
- 2012年微软开发
- Anders Hejlsberg 创建（也是C#创始人）
- 开源， 拥抱ES标准

**意外的惊喜**
- 有了类型检查，无形中增强了面向对象开发
- js中也有类和对象，没有类型检查之前，面向对象过程不友好

### part-2 node中搭建ts开发环境

#### ts安装
``` bash
  npm i -g  typescript
```
建议全局安装，可是使用tsc命令

#### 使用ts
创建ts代码文件

```ts
  # index.ts
  let text: string = "hello ts";
  console.log(text);
```
使用安装包里已经安装的命令行工具tsc执行编译

```bash
  tsc index.ts  
```
生成编译结果
```ts
  # index.js
  let text = "hello ts";
  console.log(text);
```
默认情况下，TS会做如下几种假设：
  - 假设当前的执行环境是浏览器dom环境
  - 如果代码中没有使用模块化语句（import、export），便认为改代码是全局执行 （上面的js和ts文件有相同的变量名，编译后，ts文件会报错）
  - 编译的目标代码是ES3, 保证最大限度的兼容

有2种方式可以更改ts上面的默认假设
  - 使用tsc命令行的时候，加上参数选项（不常用，麻烦）
  - 使用ts配置文件，统一进行编译配置

#### ts编译的配置文件

创建ts配置文件tsconfig.json

```bash
tsc --init
```
配置文件参数示例
```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // tsc编译选项

    "target": "es2016", // 目标代码版本标准
    "module": "commonjs", // 目标使用模块化规范标准
    "lib": ["es2016"], // 编译时使用的环境（引入的库文件）
    "outDir": "./dist" // 编译后文件存放位置
  },
  "include": ["./src"] // 需要编译的文件的如何文件夹
}
```
- 编译选项基础配置
  - target : ts编译后生成的js是哪个版本标准？
  
  - module ： ts编译后生成的js使用哪种模块化规范？

  - lib：ts编译时使用哪个运行时环境，默认（不进行配置）是浏览器dom环境， 一旦配置需要添加配置参数,比如dom
  
    注意几点：
      >1. 由于安装的ts已经默认安装了dom环境的包，所以可以添加环境配置为“dom”
      >
      >2. 如果要使用node环境，需要安装第三方库 *@types/node*
      >
      >3. 上面的@types库里包含了大量的其他js包相关的类型库，如果需要使用这个js相关的包时，也要安装对应的类型检查库， 比如jQuery, 对应@types/jquery
      >
      >    ```js
      >    $("name")
      >    ## Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.ts(2581)
      >    ```

  使用node环境，需要安装@types/node
  ``` bash
  npm i -D @types/node
  ```
- 文件路径相关的配置
  -include : 设置ts代码的存放（入口）文件夹，类似react/vue里的src文件夹
  -outDir : 设置编译后的js代码的存放位置，类似react/vue里的dist文件夹

通过上面的配置，可以实现把src文件夹里的所有ts文件进行编译，生成js文件并存放在dist文件夹里， 完整的操作流程如下：
  - 使用`tsc`命令编译
  - 使用`node ./dist/index`运行js代码。

但是，对于代码内容每次更新，都需要执行一次上面的流程，无法对新的代码内容进行热更新编译，因此我们需要一个第三方库进行支持

#### 使用第三方库优化操作流程
1. ts-node : 将ts代码在内存中进行编译（而不是编译到上面提到的dist文件夹里），并自动运行编译后的js代码

- 安装
  ```bash
  npm i -D ts-node
  ```
- 运行
  ```bash
  ts-node ./src/index.ts                                              
  
  # hello ts
  ```
  此时，就不会生成dist文件夹，在开发时，我们暂时不需要dist，直接在内存中运行代码。但是，文件内容变化之后，每次还需要执行一次` ts-node ./src/index.ts`命令，需要自动检测文件内容？？

2. nodemon : 用来检测文件内容的变化

  - 安装
    ```bash
    npm i -D nodemon
    ```
  - 使用
    ```bash
    ╰─ nodemon --exec ts-node src/index.ts                                 ─╯
    [nodemon] 3.1.10
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: ts,json
    [nodemon] starting `ts-node src/index.ts`
    hello ts
    [nodemon] clean exit - waiting for changes before restart
    
    ```
​	   使用nodemon开启了对文件内容的检测watching， 修改内容，保存后，会自动执行ts-node src/index.ts

3. 设置启动脚本，优化启动命令

  - package.json文件添加脚本命令
    ```json
    {
      "devDependencies": {
        "@types/node": "^24.7.1"
      },
      "scripts": {
        "dev": "nodemon --exec ts-node src/index.ts"
      }
    }
    ```
    从而实现使用 `npm run dev`启动项目运行的优化， 但是目前，nodemon检测的范围太大，项目里所有文件内容的变化，都会触发编译并运行流程。我们只需要检查ts代码内容的变化，因此对脚本进一步优化如下：
    ```json
    {
      "devDependencies": {
        "@types/node": "^24.7.1"
      },
      "scripts": {
        "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"
      }
    }
    ```
    - --watch src : 只检测src文件夹
    - -e ts ：只检测后缀为ts的文件

总结：
  - 开发时，使用`npm run dev`, 进行ts文件的编译和js文件的运行
  - 开发完成，使用`tsc`, 生产打包文件dist

### part-3 基本类型检查


### part-4 扩展类型-枚举


### part-5 模块化


### part-6 接口和类型兼容性


### part-7 类


### part-8 泛型


### part-9 项目实战-使用React+ts开发三子棋游戏
