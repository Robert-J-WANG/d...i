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

#### 如何进行基本约束
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

#### 编译后的代码和源代码的区别
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

#### 其他基本类型 （ts新增的类型）
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

#### 类型别名
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

#### 函数的相关类型约束

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

### part-4 扩展类型-枚举

> 扩展类型： 类型别名，枚举， 接口， 类

枚举： 通常用于约束某个变量的取值范围。比如性别（男，女）， 扑克牌的花色（4种），坦克大战的方向（上下左右）等等。
字面量结合联合类型，也能实现约束变量取值范围的作用，但是有一些问题，因此，引出了枚举的概念。

#### 字面量类型的问题：
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

#### 枚举
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

### part-5 模块化


### part-6 接口和类型兼容性


### part-7 类


### part-8 泛型


### part-9 项目实战-使用React+ts开发三子棋游戏
