## ts 基础

### 01 概述

#### 1.1 为什么要使用ts?
- 获得更好的开发体验
- 解决js中的一些问题

#### 1.2 js开发中常见的问题：
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

#### 1.3 TS简介
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

### 02 node中搭建ts开发环境

#### 2.1 ts安装
``` bash
  npm i -g  typescript
```
建议全局安装，可是使用tsc命令

#### 2.2 使用ts
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

#### 2.3 ts编译的配置文件

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

#### 2.4 使用第三方库优化操作流程
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

#### 3.1 如何进行基本约束
仅需要再 变量，函数的参数，函数的返回值，后面加上**：“类型值” **即可
```ts
let say:string = 'hello ts';
console.log(say);

function add(a: number, b: number): number {
  return a + b;
}
console.log(add(1, 2));
```

一些说明：
  - 由于TS的类型检查机制，会严格匹配前后的变量名，当重命名一处变量名（函数名）时，其他地方的变量名会自动更改
  - 通过模块引用的变量名（函数名），在一处更改时，另一处也会自动修改
  - 必须是重命名操作，而不是手动输入修改：选中目标, 按F2, 或者选中目标，右键重命名操作

ts 在很多时候可以进行类型推导，减少类型的书写
```ts
let flag = true; // 推导出为boolean类型
flag = 123 // 报错：Type 'number' is not assignable to type 'boolean'.ts(2322)
```
同样，上面的函数可以简写成：
```ts
function add(a: number, b: number) {
  return a + b;
}
console.log(add(1, 2));
// 函数返回值可以推导出为number
```

#### 3.2 编译后的代码和源代码的区别
编译结果
```js
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
```
编译结果中，没有任何类型的信息（ts）

#### 基本类型 （js原有的类型）
- number
- string
- boolean
- 数组类型
  ```ts
  // 语法糖形式，推荐使用
  let nums: number[] = [1, 2, 3];
  // 标准形式：在react中使用时，<>符合容易和组件符号混淆
  let nums2: Array<number> = [1, 2, 3];
  
  ```
- object ：不常用
  ```ts
  et user: object;
  user = { name: "duyi", age: 10 };
  
  function printVals(obj: object) {
    let vals = Object.values(obj);
    vals.forEach((v) => console.log(v));
  }
  printVals({ name: "duyi", age: 10, flag: true });
  ```
- null 和 undefined1
  这两个类型是其他所有类型的子类型，可以赋值个其他类型
  ```ts
  let hi: string = "hello ts";
  hi= null
  hi = undefined
  
  let num: number;
  num = null
  num = undefined
  
  let flag: boolean;
  flag = null
  flag = undefined
  ```
  但是，开发中我们要避免这样的操作，因此，可以修改配置文件，加以避免。 从而空类型只能赋值给其本身
  ```
  {
    // Visit https://aka.ms/tsconfig to read more about this file
    "compilerOptions": {
      // tsc编译选项
     ...
      "strictNullChecks": true // 是否开启严格的空值检查
     ...
    }, 
  
    "include": ["./src"] // 需要编译的文件的如何文件夹
  }
  ```

#### 3.3 其他基本类型 （ts新增的类型）
- 联合类型
  使用“|”，多种类型任选其一
  ```ts
  let data: string | undefined;
  data = "hello";
  data = undefined;
  ```
  可以配合 **类型保护** 进行判断
  类型保护：当对某个变量进行类型判断之后，在判断的语句块中便可以确定变量的确切类型，简单类型可以使用typeof来触发
  
  ```ts
  let data: string | undefined;
  
  if(typeof data === 'string') {
    console.log(data.length);
  }
  ```
  
- void类型： 通常用于约束函数的返回值，表示函数没有任何返回
  
  ```ts
  function fn(): void {
    return 123 // void类型的函数不能有返回值，undefined或者null也不行
  }
  
  function printMenu(): void {
    console.log('1. menu1');
    console.log('2. menu2');
  }
  ```
  
- never 类型 ： 通常用于约束函数的返回值，表示此函数永远不可能结束

    ```ts
    function throwError(message: string): never {
      throw new Error(message);
    }
    throwError("something wrong");
    
    function doSomeThingAlways(): never {
      while (true) {
        console.log("hello");
      }
    }
    doSomeThingAlways();
    ```
    
- 字面量类型 ： 使用一个值进行约束
  
  ```ts
  let text: "hello";
  text = "hello world"; // error: Type '"hello world"' is not assignable to type '"hello"'.ts(2322)
  
  let num: 10;
  num = 20; // error: Type '20' is not assignable to type '10'.ts(2322)
  
  let arr: [];
  arr = [1, 2]; // error:  Type '[number, number]' is not assignable to type '[]'.
  
  
  let gender:"male" | "female";
  gender = "male"
  
  let obj: {
    name: string;
    age: number;
  };
  
  obj = { name: "duyi", age: 10
  };
  ```
  
- 元组（Tuple）类型： 一个固定长度的数组，而且，每个数组成员的类型限定  

    ```ts
    let info: [string, number, boolean] = ["duyi", 10, true];
    ```

- any类型： any类型可以绕过类型检查，因此可以赋值个任何类型， 因此开发中不建议使用any类型   
  ```ts
  let anything: any = 10;
  anything = "hello";
  anything = true;
  anything = {};
  anything = [];
  ```

#### 3.4 类型别名
对已知的类型自定义类型名称, 规则是： type：“类型别名” = ......, 比如有以下代码：
  ```ts
  let student: {
    name: string;
    age: number;
    gender: "male" | "female";
  };

  student = {
    name: "duyi",
    age: 10,
    gender: "male",
  };

  function getStudent(): {
    name: string;
    age: number;
    gender: "male" | "female";
  }[] {
    return [];
  }
  ```
使用类型别名优化后为：
  ```ts
  // 定义类型别名
  type Student = {
    name: string;
    age: number;
    gender: "male" | "female";
  };
  
  let student: Student = {
    name: "duyi",
    age: 10,  
    gender: "male",
  }
  function getStudents(): Student[] {
    return [];
  }
  ```

甚至，类型别名之间可以相互使用
  ```ts
  type Gender = "male" | "female";
  type Student = {
    name: string;
    age: number;
    gender: Gender;
  };
  
  let student: Student;
  student = {
    name: "duyi",
    age: 10,
    gender: "female",
  };
  
  function getStudents(g: Gender): Student[] {
    return [];
  }
  getStudents("female");
  ```

使用类型别名可以优化代码的重复书写，提高可维护性

#### 3.5 函数的相关类型约束

- 函数重载： 在函数调用之前，对函数的多种情况进行申明

​	 比如我们有如下的一个函数

  ```ts
  /*
  如果a和b都是数字类型，则返回它们的乘积
  如果a和b都是字符串类型，则返回它们的连接结果
  其他情况，抛出一个错误，提示a和b类型不相同 
  */
  function combine(a:number|string, b:number|string):number|string{
    if(typeof a === 'number' && typeof b === 'number'){
      return a * b;
    }else if(typeof a === 'string' && typeof b === 'string'){
      return a + b;
    }
    throw new Error('a和b类型不相同');
    }

  let result=combine(2,3); // result: string | number
  let result2=combine('hello ','duyi'); // result2: string | number
  ```

  问题：上面的函数书写，丢失掉了一个非常重要的信息，即a和b都是number时，返回值一定是number，而a和b都是string时，返回值一定是string。result 推断类型是string | number， 但显然只是number， 同样， result 推断类型是string | number， 但显然只是string， 这样的类型推断不严谨，因此需要对函数进行申明，如下优化：

  ```ts
  function combine(a: number, b: number): number;
  function combine(a: string, b: string): string;

  function combine(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
      return a * b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    throw new Error("a和b类型不相同");
  }

  let result = combine(2, 3); // result: number
  let result2 = combine("hello ", "duyi"); // result2: string 

  ```
- 可选参数 ：可以在参数后面添加？号，表示此参数可以不传递
  ```ts
  function sum(a: number, b: number, c?:number): number {
    if(c){
      return a + b + c;
    }
    return a + b;
  }
  console.log(sum(1, 2));
  console.log(sum(1, 2, 3));
  ```

- 默认参数： 参数后面使用=号
  ```ts
  function sum(a: number, b: number, c: number = 10): number {
    return a + b + c;
  }
  console.log(sum(1, 2));
  console.log(sum(1, 2, 3));
  ```

### 04 扩展类型-枚举

> 扩展类型： 类型别名，枚举， 接口， 类

枚举： 通常用于约束某个变量的取值范围。比如性别（男，女）， 扑克牌的花色（4种），坦克大战的方向（上下左右）等等。
字面量结合联合类型，也能实现约束变量取值范围的作用，但是有一些问题，因此，引出了枚举的概念。

#### 4.1 字面量类型的问题：
- 在类型约束的位置，产生重复书写的问题
  ```ts
  let gender: "male" | "female";
  
  gender = "male";
  gender = "female";
  
  function searchGender(gender: "male" | "female") { // 类型约束重复书写
    return gender;
  }
  ```
  可以使用类型别名解决该问题：
  ```ts
  type Gender = "male" | "female"
  
  let gender: Gender;
  gender = "male";
  gender="female";
  
  function searchGender(gender:Gender){
    return gender
  }
  ```
- 变量的逻辑含义和真实的赋值产生混淆，当需要修改真实的赋值时，会产生大量的修改：
  > 比如上面的示例中，gender的赋值如果修改成"Mr"和“Mrs”时，如果代码量多，需要检查所有的位置进行修改
- 字面量不会进入编译的结果中。如果我们需要运行过程中动态获取变量的值时，无法做到

后面的2个问题，使用枚举可以很好的解决。

#### 4.2 枚举
- 如何定义一个枚举：

```
enum 枚举名称{
  枚举字段1=值1，
  枚举字段2=值2，
  枚举字段3=值3，
  ...
}
```
对上面的示例进行枚举改造如下：
```ts
enum Gender {
  Male = "male",
  Female = "female",
}

let gender: Gender;
gender = Gender.Male;// 变量赋值时，使用逻辑含义,而不是使用真实的赋值"male"
gender = Gender.Female;

function searchGender(gender: Gender) {
  return gender;
}
```
> 如果要修改变量的逻辑名称呢？？ 可以使用F2快捷键进行重命名重构
枚举会出现在编译结果中，枚举会被编译成对象，出现在编译后的js代码中。

对上面的代码进行编译，结果如下：
```js
var Gender; 

(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));

// 编译成类似于这样的一个对象
/* {
  Male:"male";
  Female:"female"
} */

let gender;
gender = Gender.Male;
gender = Gender.Female;

function searchGender(gender) {
    return gender;
}
```
因此，我们可以动态获取变量范围的值，如下打印上面的性别值
```ts
function printGender() {
  let vals = Object.values(Gender);
  vals.forEach((v) => console.log(v));
}
printGender(); // male, female
```
- 枚举的规则
  - 枚举的字段值可以是字符或者数字
  ```ts
  enum Level {
    level1 = "one",
    level2 = "two",
    level3 = "three",
  }
  
  enum LevelNum {
    level1 = 1,
    level2 = 2,
    level3 = 3,
  }
  ```
  - 数组枚举的字段值会自动递增
  ```ts
  enum LevelNum {
    level1 = 1,
    level2,
    level3,
  }
  
  let level2 = LevelNum.level2;
  let level3 = LevelNum.level3;
  console.log(level2); //2
  console.log(level3); //3
  ```
  > 如上所示：假如不给level2，level3字段赋值，字段值会自动递增，如果level1也不赋值，level1默认是0

- 最佳实践：
  - 尽量嫑在一个枚举中既出现字符串字段，又出现数字字段
  - 使用枚举时，尽量使用枚举字段的名称，不使用真实的赋值

### 05 模块化

> 模块化相关的参数配置
>
> | 配置名称            | 含义                         |
> | ------------------- | ---------------------------- |
> | Module              | 编译结果中使用的模块化标准   |
> | moduleResolution    | 解析模块的模式               |
> | noImplicitUseStrict | 编译结果中不包含“use strict” |
> | removeComments      | 编译结果中移除注释           |
> | noEmitOnError       | 错误时不生成编译结果         |
> | esModuleInterop     | 启用es模块化交互非es模块导出 |

> 前段领域模块化标准：ES6, commonjs, amd, umd, system, esnext, 在ts中，我们只关注 ES6, commonjs

#### 5.1 ts中如何书写模块化语句
ts中，导入和导出模块，统一使用es6的模块化标准
```ts
// myModule.ts 
export const text = "hello module";

export function sum(num1: number, num2: number) {
  return num1 + num2;
}

// index.ts
import { sum, text } from "./myModule";

console.log(text);
console.log(sum(1, 2));
```

#### 5.2 编译结果中的模块化
> - 模块化标准可配置
> - 真实项目中，ts使用模块化标准比较复杂，有时用es标准，有时使用commonjs标准（比如使用的一些第三方库），因此我们需要探究ts中使用的模块化，在编译结果中的具体情况

- ts中的模块化在编译结果中：
  - 如果编译结果的模块化标准是ES6，即ts中属性的es6标准要编译成es6标准的js，没有区别
  - 如果编译结果的模块化标准是commonjs：即ts中属性的es6标准要编译成commonjs标准的js, 导出的声明会变成exports的属性，默认的导出会变成exports的default属性
```ts
// myModule.ts
export const text = "hello module";

export function sum(num1: number, num2: number) {
  return num1 + num2;
}

export default function () {
  console.log("hello");
}


// index.ts
import sayHello, { sum, text } from "./myModule";

console.log(text);
console.log(sum(1, 2));

sayHello();

// ./dist/myModule.ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.text = void 0;
exports.sum = sum;
exports.default = default_1;
exports.text = "hello module";

function sum(num1, num2) {
    return num1 + num2;
}
function default_1() {
    console.log("hello");
}

// ./dist/index.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myModule_1 = require("./myModule");
console.log(myModule_1.text);
console.log((0, myModule_1.sum)(1, 2));
(0, myModule_1.default)();

```

#### 5.3 解决默认导入时的错误
> 比如我们在ts文件中使用nodejs的一些接口，例如fs模块
```ts
// index.ts
import fs from "fs";
const files = fs.readdirSync("./");
console.log(files);

// .dist/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const files = fs_1.default.readdirSync("./");
console.log(files);

```
> 报错：使用默认导入fs模块时， 编译成的js代码中，会通过模块fs的default属性来使用，如上面的fs_1.default。但是fs模块压根就不是用es6写的，而是使用commonjs标准写的。这个模块是在module.export对象里，而我们上面使用的的默认导入，ts编译时需要在exports.default里去找，但是commonjs压根没有default属性，所以报错。 如何解决？？

- 方法1：使用单个方法的具名导入使用， 书写不太方法（无法提示方法）
  ```ts
  // index.ts
  import { readdirSync } from "fs";
  const files = readdirSync("./");
  console.log(files);
  
  // .dist/index.js
  Object.defineProperty(exports, "__esModule", { value: true });
  const fs_1 = require("fs");
  const files = (0, fs_1.readdirSync)("./");
  console.log(files);
  ```

- 方法2： 导入模块所有内容，再重命名

    ```ts
    // index.ts
    import * as fs from "fs";
    const files = fs.readdirSync("./");
    console.log(files);
    
    // .dist/index.js
    Object.defineProperty(exports, "__esModule", { value: true });
    const fs = require("fs");
    const files = fs.readdirSync("./");
    console.log(files);
    ```

- 方法3：使用配置，实现es和非es模块标准交互 （推荐）
  ```bash
  "compilerOptions": {
      // tsc编译选项
      ...
      "esModuleInterop": true // 允许使用ES6模块化语法去引入CommonJS模块
      ...
    },
  ```
  
  ```ts
  // index.ts
  import fs = require("fs");
  const files = fs.readdirSync("./");
  console.log(files);
  
  // .dist/index.js
  Object.defineProperty(exports, "__esModule", { value: true });
  const fs = require("fs");
  const files = fs.readdirSync("./");
  console.log(files);
  
  ```

#### 5.4 如何在TS中书写commonjs标准的模块化代码(了解)

- 导出： export = xxx
  ```ts
  export = {
    text: "hello module",
    sum: function (num1: number, num2: number) {
      return num1 + num2;
    },
  };
  ```
- 导入： import xxx = require（“xxx”）
  ```ts
  import myModule = require("./myModule");
  
  console.log(myModule.text);
  console.log(myModule.sum(1, 2));
  
  ```

#### 5.5 模块解析
> 模块解析：应该从什么位置寻找模块

在ts中，有两种模块解析策略：
- classic: es6标准之前指定的，比较老的项目里使用，不推荐
- node:和nodejs的模块解析方式完全一致（只是把js替换成ts）
  - 路径模块：相对路径 `import utils from './utils' `或者 `require('./utils')`， 绝对路径 `import utils from '/utils' `或者 `require('/utils')`
    - 先按文件的书写文件找？
    - 看package.json里有没有设置main字段？
    - 找同名的文件夹（utils），依次找找utils里的index文件

  - 非路径模块（无前缀：第三方、自定义、内置）： `import utils from 'utils' `或者 `require('utils')`
    - 是不是内置模块？
    - 按目录逐级查找 node_modules

### part-6 接口和类型兼容性

#### 6.1 扩展类型——接口
> 扩展类型： 类型别名（type alias），枚举（enum)，接口（interface），类（class)

ts中的接口：用于约束类，对象，函数的契约（标准）。

契约（标准）的形式：
  - 文档：比如前后端交互时的API文档，是一种弱标准
  - 代码约束： 强标准， 比如在后端开发中，经常使用的接口interface


##### 6.1.1 接口如何约束对象？
```ts
interface User {
  name: string;
  age: number;
}

let u: User = {
  name: "Robert",
  age: 18,
};
```

对比使用类型别名

```ts
type User={
  name: string;
  age: number;
}

let u: User = {
  name: "Robert",
  age: 18,
};
```

现阶段使用接口和类型别名，基本什么区别，但是主要的区别在于约束类，后面会详细理解。推荐对象约束时使用接口

##### 6.1.2 接口如何约束函数？

- 对象里的函数（方法）
```ts
interface User {
  name: string;
  age: number;
  // 箭头函数
  sayHello: () => void;
  // 普通函数
  sayHi(): void;
}
let u: User = {
  name: "Robert",
  age: 18,
  sayHello: () => {
    console.log("Hello");
  },
  sayHi() {
    console.log("hi");
  },
};
```
​	对比使用类型别名：
```ts
type User = {
  name: string;
  age: number;
   // 箭头函数
  sayHello: () => void;
  // 普通函数
  sayHi(): void;
};

let u: User = {
  name: "Robert",
  age: 18,
  sayHello: () => {
    console.log("Hello");
  },
  sayHi() {
    console.log("hi");
  },
};
```

- 普通函数
> 假设一个数组求和函数，对满足条件（具体什么条件？使用者定义，使用回调函数）的数组项求和
> ```ts
> function sum(numbers: number[], Callback: (n: number) => boolean) {
>   let result = 0;
>   numbers.forEach((n) => {
>     if (Callback(n)) {
>       result += n;
>     }
>   });
>   return result;
> }
> 
> // 对奇数求和
> const result = sum([1, 2, 4, 5, 7, 11], (n) => n % 2 !== 0);
> console.log(result); // 24
> ```

使用接口interface约束

```ts
interface Condition {
  (n: number): boolean;
}

function sum(numbers: number[], Callback: Condition) {
  let result = 0;
  numbers.forEach((n) => {
    if (Callback(n)) {
      result += n;
    }
  });
  return result;
}

// 对奇数求和
const result = sum([1, 2, 4, 5, 7, 11], (n) => n % 2 !== 0);
console.log(result); // 24
```

对比使用类型别名约束

```ts
type Condition = {
  (n: number): boolean;
};

function sum(numbers: number[], Callback: Condition) {
  let result = 0;
  numbers.forEach((n) => {
    if (Callback(n)) {
      result += n;
    }
  });
  return result;
}

// 对奇数求和
const result = sum([1, 2, 4, 5, 7, 11], (n) => n % 2 !== 0);
console.log(result); // 24
```

##### 6.1.5 接口的继承
类似于类的继承概念，ts中的接口也能进行继承，实现多种接口约束的组合

```ts
interface A {
  t1: number;
}
interface B extends A {
  t2: string;
}

let b: B = {
  t1: 111,
  t2: "hahhaha",
};
```

也可以继承多个接口

```ts
interface A {
  t1: number;
}
interface B  {
  t2: string;
}

interface C extends A,B { // 继承多个接口
  t3: boolean;
}

let c: C = {
  t1: 111,
  t2: "hahhaha",
  t3: false
};
```

**注意**： 类型别名不能进行继承， 但是类型别名也可以实现类似的组合效果。需要通过```&```符号，这种组合叫做交叉类型

```ts
type A = {
  t1: number;
};
type B = {
  t2: string;
};

type C = {
  t3: boolean;
} & A & B; //交叉组合

let c: C = {
  t1: 111,
  t2: "hahhaha",
  t3: false,
};
```

主要区别：

- 子接口不能覆盖父接口的成员

    ```ts
    interface A {
      t1: number;
    }
    interface B {
      t2: string;
    }
    
    interface C extends A, B {
      t1: string; // 不能重新覆盖（重写）父接口成员的类型 :Interface 'C' incorrectly extends interface 'A'. Types of property 't1' are incompatible. Type 'string' is not assignable to type 'number'.ts(2430)
      t3: boolean;
    }
    ```

- 而上面对比的交叉类型别名，可以进行重写: 但是此时的类型会变成never（ 一个变量既是number，又是string，根本不可能存在）

    ```ts
    type A = {
      t1: number;
    };
    type B = {
      t2: string;
    };
    
    type C = {
      t1: string;
      t3: boolean;
    } & A & B;
    ```

    	**因此，使用接口更加合理**

##### 6.1.6 readonly修饰符

只读修饰符： 修改的目标是只读的，不能重写

> 比如有如下代码：
>
> ```ts
> interface Student {
>   id: number;
>   name: string;
>   age: number;
>   marks: number[];
> }
> 
> let student: Student = {
>   id: 1001,
>   name: "Peter",
>   age: 18,
>   marks: [100, 90, 85],
> };
> 
> student.id = 2000; // 重新修改id
> student.marks.push(99) // 添加一个成绩
> ```

如果希望学生的id值是不能修改的，就可以使用只读修饰符

```ts
interface Student {
  readonly id: number;
  name: string;
  age: number;
  readonly marks: readonly number[];
}

let student: Student = {
  id: 1001,
  name: "Peter",
  age: 18,
  marks: [100, 90, 85],
};

student.id = 2000; // 不能重新修改id, Cannot assign to 'id' because it is a read-only property.
student.marks.push(99); // 无法修改数组成员,添加一个成绩, Property 'push' does not exist on type 'readonly number[]'.
```



#### 6.2 类型兼容性

> 假设我们把A赋值给B：A->B， 如果能完成赋值，怎认为类型B和A兼容

- 基本类型（number，string，boolean），需要完全匹配
- 对于对象类型：满足子结构辨型法
  > 子结构辨型法（鸭子辨型法）：目标类型需要一些特征，赋值类型只要满足这些特征就行

```ts
// 目标类型
interface Duck {
  sound: "gagaga";
  swim: () => void;
}

// 赋值的类型
const Person = {
  name: "Peter",
  age: 18,
  sound: "gagaga" as "gagaga", // as是类型断言符号
  swim: () => {
    console.log("i can swim");
  },
};

// 把赋值类型赋值给目标类型
let duck: Duck = Person;
```

原因： ts中往往会有一个大的对象（也可能是调用接口获得的），但是在某处，仅仅需要部分对象的特征，而其他地方可能需要另外的一些特征，因此，为了不重复书写对个对象，设计成可以写一个大的对象，同时可以赋值给对个字类型

**注意**： 直接使用字面量对象赋值时，会进行严格的类型兼容检查

```ts
// 目标类型
interface Duck {
  sound: "gagaga";
  swim: () => void;
}

// 把字面量对象赋值类型赋值给目标类型（类型必须严格匹配）
let duck: Duck = {
  // name: "Peter",   
  // age: 18,
  sound: "gagaga" as "gagaga",
  swim: () => {
    console.log("i can swim");
  },
};
```

- 函数类型： 通常出现在回调函数的地方
    - 函数参数：传递给目标函数的参数可以少，但不能多
    - 函数返回值：要求有返回值的，必须返回；不要求返回值的，随意

```ts
interface Condition {
  (n: number, i: number): boolean;
}

function sum(numbers: number[], Callback: Condition) {
  let result = 0;

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (Callback(n, i)) {
      result += n;
    }
  }

  return result;
}

// 对奇数求和
const r = sum([1, 2, 4, 5, 7, 11], (n) => n % 2 !== 0); // 目标函数类型参数是2个，但是传递的时候，可以少于2个
console.log(r); // 24

// 对下标为奇数的项求和
const r2 = sum([1, 2, 4, 5, 7, 11], (n, i) => i % 2 !== 0); 
console.log(r2); //18
```

### part-7 类

> 面向对象思想

对于ts 基础，学习类的时候，我们只讨论新增的语法部分

示例代码：

```js
// js代码：
class User {
  constructor(name, age) {
    // 给当前的属性赋值
    this.name = name;
    this.age = age;
  }
}

let u = new User("Sam", 19); // 通过new 实例化类的对象，并给属性赋值
console.log(u)
u.gender = "male" // 动态添加属性
console.log(u)
```

js中的类，允许在实例化对象的过程中动态添加成员（属性和方法），但是在ts中，这是不允许的，在定义类的时候，就必须要确定类的成员，从而排除后面随意增加（修改）类的成员的风险

#### 7.1 属性：

- 属性列表 ：Ts中，对于类的属性，要求使用**属性列表**来描述类的属性

  ```ts
  class User {
      
    // 定义类的时候，必须要明确类的成员，使用属性类别描述
    name: string;
    age: number;
      
    constructor(name: string, age: number) {
      // 给当前的属性赋值
      this.name = name;
      this.age = age;
    }
  }
  
  // 实例化一个对象
  let u = new User("Sam", 18);
  console.log(u);
  u.gender = "male"; // 报错： Property 'gender' does not exist on type 'User'.
  ```

  

- 属性的初始化：如果上面的类中没有属性构造器函数，或者忘记书写了一些属性的赋值：

  **情况1：**没有构造器函数

  ```ts
  // 下面的类相当于是一个空的，虽然有属性成员类型，但是没有属性成员，无法通过给构造函数传递参数完成赋值
  
  class User {
    // 定义类的时候，必须要明确成员的类型
    name: string;
    age: number;
  }
  
  let u = new User(); // 示例的对象是空的
  console.log(u); // User {}
  // 给对象追加参数
  u.name = "sam";
  u.age = 19;
  console.log(u); // User { name: 'sam', age: 19 }
  ```
  **情况2：**虽然有构造器（能接受参数），但是忘记赋值给属性成员

  ```ts
  // 
  class User {
    // 定义类的时候，必须要明确类的成员
    name: string;
    age: number;
    constructor(name: string, age: number) {
      // 忘记给属性赋值
    }
  }
  
  let u = new User("sam", 18); // 虽然传递了参数，但是无法完成赋值
  console.log(u); // User {}
  u.name = "sam";
  u.age = 19;
  
  console.log(u); // User { name: 'sam', age: 19 }
  ```

  针对上面的2中情况，我们可以通过参数配置，实现更严的属性赋值检查

  ```json
  "strictPropertyInitialization": true //严格检查属性的初始化
  ```

  这样设置，会提示：Property 'name' has no initializer and is not definitely assigned in the constructor.

  

- 属性默认值： 在设计类的属性时，如果我们明确知道一个属性的默认值，可以通过属性列表或者构造函数设置默认值

    ```ts
    class User {
      name: string;
      age: number;
      gender: "male" | "female" = "male"; // 设置属性默认值
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
    
    let u = new User("sam", 18);
    console.log(u); // User { name: 'sam', age: 18, gender: 'male' }
    u.gender = "female"; // 给属性追加赋值来修改
    console.log(u); // User { name: 'sam', age: 18, gender: 'female' }
    ```
  
  ```ts
  class User {
    name: string;
    age: number;
    gender: "male" | "female";
    // 通过构造函数，给属性赋值，设置默认值
    constructor(name: string, age: number, gender: "male" | "female" = "male") {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }
  }
  
  let u = new User("sam", 18);
  console.log(u); // User { name: 'sam', age: 18, gender: 'male' }
  u.gender = "female";
  console.log(u); // User { name: 'sam', age: 18, gender: 'female' }
  ```


- 可选属性： 属性后面添加？设置可选属性, 可选属性没有初始化的要求

  ```ts
  class User {
    name: string;
    age: number;
    gender: "male" | "female" = "male";
    id?: string; // 可选属性
    
    constructor(name: string, age: number) {
      // 给属性赋值
      this.name = name;
      this.age = age;
    }
  }
  
  let u = new User("sam", 18);
  console.log(u);  // User { gender: 'male', name: 'sam', age: 18 }
  u.id = "10010000";
  console.log(u); // User { gender: 'male', name: 'sam', age: 18, id: '10010000' }
  
  ```

- 只读属性： 有点属性，初始化之后，就不能再修改（赋值）了，可以添加readonly关键字修饰
  ```ts
  class User {
    readonly id: number; // 设置为只读属性
    name: string;
    age: number;
    gender: "male" | "female" = "male";
    pid?: string; // 可选属性
  
    constructor(name: string, age: number, pid?: string) {
      // 给属性赋值
      this.id = Math.random();
      this.name = name;
      this.age = age;
      this.pid = pid;
    }
  }
  
  let u = new User("sam", 18, "10000100");
  console.log(u.id); // id属性可以读取
  
  u.id = 1238409138493; // 报错：但是不能修改： Cannot assign to 'id' because it is a read-only property.
  ```



#### 7.2 访问修饰符

访问修饰符：用来控制类中的某个成员（属性，方法）的访问权限。

- Public : 默认的 (不写的时候），公开的， 类的内部和外部的代码都能访问

    ```ts
    class User {
      public readonly id: number; 
      public name: string;
      age: number;
      gender: "male" | "female" = "male";
      pid?: string; 
    
      constructor(name: string, age: number, pid?: string) {
        // 给属性赋值
        this.id = Math.random();
        this.name = name;
        this.age = age;
        this.pid = pid;
      }
    }
    
    let u = new User("sam", 18, "10000100");
    console.log(u.id);
    console.log(u.age);
    console.log(u.name);
    console.log(u.gender);
    console.log(u.pid);
    ```

- private： 私有的，只能在类的内部使用

    ```ts
    class User {
      public readonly id: number; 
      public name: string;
      age: number;
      gender: "male" | "female" = "male";
      pid?: string; 
    
      // 私有属性，只在类的内容使用（维护）
      private publishNumber: number = 3; // 一天能发布文章的上限值
      private curPublish: number = 0; // 当前发布的文章数
    
      constructor(name: string, age: number, pid?: string) {
        // 给属性赋值
        this.id = Math.random();
        this.name = name;
        this.age = age;
        this.pid = pid;
      }
    
      // 类的内容方法中使用私有属性
      publish(title: string) {
        if (this.curPublish < this.publishNumber) {
          console.log(title + " is published");
          this.curPublish++;
        } else {
          console.log("you can not publish today");
        }
      }
    }
    
    let u = new User("sam", 18, "10000100");
    u.publish("title 1"); // title 1 is published
    u.publish("title 2"); // title 2 is published
    u.publish("title 3"); // title 3 is published
    u.publish("title 4"); // ou can not publish today
    
    
    u.publishNumber=100 // 报错，外部无法操作私有属性：Property 'publishNumber' is private and only accessible within class 'User'.ts(2341)
    ```
    
- prtected: 受保护的，暂时不讲



#### 7.3 属性的简写

如果类中的某个属性，通过构造函数传递参数实现初始化赋值，若这个参数不足任何处理，直接赋值个属性的话，我们可以把构造函数里的参数添加任何访问修饰符，对书写进行简写

```ts
class User {
  public readonly id: number; 
  gender: "male" | "female" = "male";
  private publishNumber: number = 3; 
  private curPublish: number = 0; 

  // 在构造器函数中，对参数赋值给属性的简写  
  constructor(public name: string, public age: number, public pid?: string) {
    // 给属性赋值
    this.id = Math.random();
  }

  publish(title: string) {
    if (this.curPublish < this.publishNumber) {
      console.log(title + " is published");
      this.curPublish++;
    } else {
      console.log("you can not publish today");
    }
  }
}

let u = new User("sam", 18, "10000100");
```



#### 7.4 访问器 (Getter / Setter)

作用：用于控制类的属性的读取和赋值。 对于公共的属性（比如年龄属性），可以在类的外部直接读取并赋值，但是对于属性更细致的处理（比如年龄不能是小数，年龄不能是负数等等），我们需要放置进类里处理，外部访问通过访问器（其实就是一个函数接口）处理后的结果。

- 一些后端语言（比如JAVA）的处理方式：把属性私有化，新增2个方法（访问器）来进行属性的读取和设置

    ```ts
    class User {
      public readonly id: number; // 设置为只读属性
      gender: "male" | "female" = "male";
      private _publishNumber: number = 3; // 一天能发布文章的上限值
      private _curPublish: number = 0; // 当前发布的文章数
    
      constructor(public name: string, private _age: number, public pid?: string) {
        // 给属性赋值
        this.id = Math.random();
      }
    
      // 对属性进行处理
      setAge(value: number) {
        // 设置年龄范围
        if (value < 0) {
          value = 0;
        }
        if (value >= 200) {
          value = 200;
        }
        this._age = value;
      }
    
      getAge() {
        // 对年龄取整
        return Math.floor(this._age);
      }
    
      publish(title: string) {
        if (this._curPublish < this._publishNumber) {
          console.log(title + " is published");
          this._curPublish++;
        } else {
          console.log("you can not publish today");
        }
      }
    }
    
    let u = new User("sam", 18, "10000100");
    
    //使用访问器读取年龄
    let age = u.getAge();
    console.log(age);
    
    // 使用访问器设置年龄
    u.setAge(100);
    let age2 = u.getAge();
    console.log(age2);
    
    u.setAge(300);
    let age3 = u.getAge();
    console.log(age3);
    
    u.setAge(100.456);
    let age4 = u.getAge();
    console.log(age4);
    ```

    上面的方法，逻辑上没有任何问题，但是使用时，感官上和属性（比如上面的age) 没有任何关系

- 使用访问器关键字（C#, ES的做法），`set age(){}`和 `get age(){}`。更优雅的语法，是一种语法糖，本质上还是一个函数.

    外部操作属性时，通过访问器属性（age) 来执行

    ```ts
    class User {
      public readonly id: number; // 设置为只读属性
      gender: "male" | "female" = "male";
      private _publishNumber: number = 3; // 一天能发布文章的上限值
      private _curPublish: number = 0; // 当前发布的文章数
    
      constructor(public name: string, private _age: number, public pid?: string) {
        // 给属性赋值
        this.id = Math.random();
      }
    
      // 对属性进行处理
      set age(value: number) {
        // 设置年龄范围
        if (value < 0) {
          value = 0;
        }
        if (value >= 200) {
          value = 200;
        }
        this._age = value;
      }
    
      get age() {
        // 对年龄取整
        return Math.floor(this._age);
      }
    
      publish(title: string) {
        if (this._curPublish < this._publishNumber) {
          console.log(title + " is published");
          this._curPublish++;
        } else {
          console.log("you can not publish today");
        }
      }
    }
    
    let u = new User("sam", 18, "10000100");
    // 读取访问器属性
    console.log(u.age);
    
    // 给访问器属性赋值
    u.age = 100;
    console.log(u.age);
    
    u.age = 300;
    console.log(u.age);
    
    u.age = 100.465;
    console.log(u.age);
    ```

    

### part-8 泛型

> 上面的章节里的基础，已经可以很好地解决js中开发的问题了。 但是还有一些更复杂的问题，比如下面的代码：
>
> ```ts
> /**
>  * 从一个数组中取前n项，
>  * @param arr
>  * @param n
>  * @returns 一个新的数组
>  */
> function take(arr, n) {
>   if (n >= arr.length) {
>     return arr;
>   } else {
>     const newArr = [];
>     for (let i = 0; i < n; i++) {
>       newArr.push(arr[i]);
>     }
>     return newArr;
>   }
> }
> 
> const res = take([1, 3, 4, 6, 8], 2)
> console.log(res) // [ 1, 3 ]
> ```
>
> 上面的是纯js的写法， 没有进行任何类型的限制，调用函数的过程，可能会输入字符串或者其他类型，使用ts类型检查.
>
> 但是我们无法确定输入的数组的类型，是数字型，还是字符串型？还是混合型，因此目前我们只能写成any型
>
> ```ts
> /**
>  * 从一个数组中取前n项，
>  * @param arr
>  * @param n
>  * @returns 一个新的数组
>  */
> function take(arr: any[], n: number): any[] {
>   if (n >= arr.length) {
>     return arr;
>   } else {
>     const newArr: any[] = [];
>     for (let i = 0; i < n; i++) {
>       newArr.push(arr[i]);
>     }
>     return newArr;
>   }
> }
> 
> const res = take([1, 3, 4, 6, 8], 2); // any[] | undefined
> console.log(res); // [ 1, 3 ]
> const res2 = take(["1", "3", "4", " 6", "8"], 2); // any[] | undefined
> console.log(res2); // [ "1", "3" ]
> ```
>
> 此时，我们调用此函数时，res和res2的类型都是是any[] | undefined， 而实际上res是number [ ], res2是string [ ]。 这样的结果，不能准确检查出类型。同时，我们丢失了一个非常重要的信息： 不管传入的是什么类型，传入的数组的类型，返回的数组类型，和函数里定义的变量newArr的类型应该是完全一致的，也就是说上面的3个any[] 应该是同一个类型。因此，我们对于在定义时不确定变量类型，并且只有在使用时才能确定类型的情况，可以使用泛型(Generics)

**泛型： 是指附属于函数，类，接口， 类型别名之上的类型，相当于一个占位符（或者是一个存储类型的变量），在定义时，无法预先指定变量的类型，所以先试用一个符号（变量）代替， 调用时，才能确定它的类型，再传入具体的类型**



- 在函数中使用泛型： 

    在函数名后写上```<泛型名称>```， 调用时，传入具体的类型

    ```ts
    // 定义函数
    function take<T>(){
        ...
    }
    // 调用函数
    take<number>();  // 调用时，传入number 类型
    ```

    现在对上面的take函数进行改造

    ```ts
    /**
     * 从一个数组中取前n项，
     * @param arr
     * @param n
     * @returns 一个新的数组
     */
    function take<T>(arr: T[], n: number): T[] {
      if (n >= arr.length) {
        return arr;
      } else {
        const newArr: T[] = [];
        for (let i = 0; i < n; i++) {
          newArr.push(arr[i]);
        }
        return newArr;
      }
    }
    
    const res = take<number>([1, 3, 4, 6, 8], 2); // number[]， 调用时，传入number 类型
    console.log(res); // [ 1, 3 t
    const res2 = take(["1", "3", "4", " 6", "8"], 2); //string[]，调用时，不传入类型，ts也可以进行类型推断 
    console.log(res2); // [ "1", "3" ]
    ```

    **注意：** 很多情况，ts会根据传入参入的类型推断出泛型对应的类型

- 在类，接口，类型别名中书写泛型

    直接在名称后面书写```<泛型名称>```

    ```ts
    // 之前的回调函数的类型申明
    // 回调函数，判断数组中的某一项是否满足条件
    type callback = (n: number, i: number) => boolean;
    ```

    上面的类型什么，没有通用性，只能适用于number型的数组（数组的成员n: number），但是如果是string类型，或者其他类型的数组呢？？？我们使用泛型改造其通用性

    ```ts
    // 回调函数，判断数组中的某一项是否满足条件
    type callback<T> = (n: T, i: number) => boolean;
    
    function filter<T>(arr: T[], callback: callback<T>): T[] {
      const newArr: T[] = [];
      arr.forEach((n, i) => {
        if (callback(n, i)) {
          newArr.push(n);
        }
      });
      return newArr;
    }
    
    const res = filter([1, 3, 4, 5, 7, 90, 101], (n) => n % 2 !== 0);
    console.log(res); // [ 1, 3, 5, 7, 101 ]
    
    const res2 = filter(["1", "3", "4", "5", "7", "90", "101"],(n, i) => i % 2 !== 0);
    console.log(res2); // [ '3', '5', '90' ]
    ```

    接口的泛型，和上面类型别名的基本一样，把类型别名改成接口

    ```ts
    interface callback<T> {
      (n: T, i: number): boolean;
    }
    
    function filter<T>(arr: T[], callback: callback<T>): T[] {
      const newArr: T[] = [];
      arr.forEach((n, i) => {
        if (callback(n, i)) {
          newArr.push(n);
        }
      });
      return newArr;
    }
    
    const res = filter([1, 3, 4, 5, 7, 90, 101], (n) => n % 2 !== 0);
    console.log(res); // [ 1, 3, 5, 7, 101 ]
    
    const res2 = filter(["1", "3", "4", "5", "7", "90", "101"],(n, i) => i % 2 !== 0);
    console.log(res2); // [ '3', '5', '90' ]
    ```

    类中使用泛型：

    ```ts
    class ArrayHelper<T> {
      constructor(private arr: T[]) {}
      /**
       * 从数组里去前n个数
       *
       * @param n
       * @returns
       */
      take(n: number): T[] {
        if (n >= this.arr.length) {
          return this.arr;
        } else {
          const newArr: T[] = [];
          for (let i = 0; i < n; i++) {
            newArr.push(this.arr[i]);
          }
          return newArr;
        }
      }
    
      /**
       * 洗牌
       * 随机打乱数组成员的顺序
       * @returns
       */
      shuffle(): T[] {
        this.arr.forEach((n, i) => {
          const targetIndex = this.getRandom(0, this.arr.length);
          const temp = this.arr[i];
          this.arr[i] = this.arr[targetIndex];
          this.arr[targetIndex] = temp;
        });
        return this.arr;
      }
    
      /**
       * 生成一个范围类的随机数，取不到最大值
       * @param min
       * @param max
       * @returns
       */
      private getRandom(min: number, max: number) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
      }
    }
    
    const arr = new ArrayHelper([1, 2, 3, 4, 5]);
    
    console.log(arr.take(2)); // [ 1, 2 ]
    console.log(arr.shuffle()); // [ 5, 2, 4, 1, 3 ]
    ```

- 泛型约束: 

    用于限制泛型的取值

    ```ts
    /**
     * 将一个对象里的name属性的值的首字母大写
     * @param obj 一个对象，必须有name属性
     * @returns 包含首字母大写的name属性的对象
     */
    function nameToUpperCase<T>(obj: T): T {
      obj.name="K" // 报错：Property 'name' does not exist on type 'T'.ts(2339)， 因为书写这一步代码时，我们还不知道obj的类型，因此需要对泛型T进行必要的限定（约束）
    }
    
    const o = {
      name: "kevin wang",
      age: 18,
    };
    
    const newO = nameToUpperCase(o);
    ```

    泛型约束通常使用关键字```extends```, 继承一个设定好的类型，比如上面的例子，我们知道需要的obj至少必须有个属性name

    ```ts
    interface HasNameProperty {
      name: string;
    }
    
    /**
     * 将一个对象里的name属性的值的首字母大写
     * @param obj 一个对象，必须有name属性
     * @returns 包含首字母大写的name属性的对象
     */
    function nameToUpperCase<T extends HasNameProperty>(obj: T): T {
      obj.name = obj.name
        .split(" ")
        .map((n) => n[0].toUpperCase() + n.substring(1))
        .join(" ");
    
      return obj;
    }
    
    const o = {
      name: "kevin wang",
      age: 18,
    };
    
    const newO = nameToUpperCase(o);
    ```

    

- 多泛型

    ```ts
    /**
     * 将多个数组混合：[1,2,3]+["4","5","6"] => [1,"4", 2,"5",3,"6"]
     */
    function mixArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
      const newArr: (T | K)[] = [];
      if (arr1.length !== arr2.length) {
        throw new Error("arr1和arr2长度不相等");
      }
      for (let i = 0; i < arr1.length; i++) {
        newArr.push(arr1[i]);
        newArr.push(arr2[i]);
      }
      return newArr;
    }
    const res = mixArray([1, 2, 3], ["a", "b", "c"]);
    console.log(res); // [ 1, 'a', 2, 'b', 3, 'c' ]
    ```

    

### part-9 项目实战

#### ts 扑克牌

- 目标： 创建一副扑克牌（不包括大小王），打印给扑克牌
- 使用枚举改造程序
- 使用模块化
- 使用接口改造程序，加入大小王
- 使用类改造程序，加入洗牌，发牌的功能

#### 泛型练习- 模拟Map函数

开发一个字典类（Dictionary），字典中会保存键值对的数据

> 键值对数据特点：

> - 键（key）可以是任意类型，但不允许重复
> - 值（value）可以是任意类型
> - 每一个键对应一个值
> - 所以的键类型相同，所以的值类型相同

字典类中对键值对数据的操作：

- 重新设置某个键对应的值，如果不存在，则添加
- 循环每一个键值对
- 判断某个键是否存在

- 按照键，删除对应的键值对
- 得到当前键值对的数量

#### React+ts开发三子棋游戏
