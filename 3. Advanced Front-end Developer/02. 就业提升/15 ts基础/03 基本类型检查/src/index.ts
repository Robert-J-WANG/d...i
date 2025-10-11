// let say: string = "hello ts";

// console.log(say);

// function add(a: number, b: number): number {
//   return a + b;
// }
// console.log(add(1, 2));

// let flag = true;
// flag = 123;

function add(a: number, b: number) {
  return a + b;
}
console.log(add(1, 2));

// 语法糖形式，推荐使用
let nums: number[] = [1, 2, 3];
// 标准形式：在react中使用时，<>符合容易和组件符号混淆
let nums2: Array<number> = [1, 2, 3];
// 混合形式：可以设置不同类型
let info: [string, number, boolean] = ["duyi", 10, true];

let user: object;
user = { name: "duyi", age: 10 };

function printVals(obj: object) {
  let vals = Object.values(obj);
  vals.forEach((v) => console.log(v));
}
printVals({ name: "duyi", age: 10, flag: true });

/* let hi: string = "hello ts";
hi = null;
hi = undefined;

let num: number;
num = null;
num = undefined;

let flag: boolean;
flag = null;
flag = undefined;
 */
let data: string | undefined;

if (typeof data === "string") {
  console.log(data.length);
}

function printMenu(): void {
  // return 123; // void类型的函数可以有返回值，但是返回值必须是undefined或者null
  console.log("1. menu1");
  console.log("2. menu2");
}

// function throwError(message: string): never {
//   throw new Error(message);
// }
// throwError("something wrong");

/* function doSomeThingAlways(): never {
  while (true) {
    console.log("hello");
  }
}
doSomeThingAlways(); */

let text: "hello";
text = "hello world"; // error Type '"hello world"' is not assignable to type '"hello"'.ts(2322)

let num: 10;
num = 20; // error Type '20' is not assignable to type '10'.ts(2322)

let arr: [];
arr = [1, 2]; // error:  Type '[number, number]' is not assignable to type '[]'.

let gender: "male" | "female";
gender = "male";

let obj: {
  name: string;
  age: number;
};

obj = { name: "duyi", age: 10 };

let anything: any = 10;
anything = "hello";
anything = true;
anything = {};
anything = [];

/* let student: {
  name: string;
  age: number;
  gender: "male" | "female";
};

student = {
  name: "duyi",
  age: 10,
  gender: "male",
};

function getStudents(): {
  name: string;
  age: number;
  gender: "male" | "female";
}[] {
  return [];
} */

// type Student = {
//   name: string;
//   age: number;
//   gender: "male" | "female";
// };

// let student: Student = {
//   name: "duyi",
//   age: 10,
//   gender: "male",
// };
// function getStudents(): Student[] {
//   return [];
// }
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

function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
/*
 如果a和b都是数字类型，则返回它们的乘积
 如果a和b都是字符串类型，则返回它们的连接结果
 其他情况，抛出一个错误，提示a和b类型不相同 
*/
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a * b;
  } else if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  throw new Error("a和b类型不相同");
}

let result = combine(2, 3); // result: string | number
let result2 = combine("hello ", "duyi"); // result: string | number

function sum(a: number, b: number, c: number = 10): number {
  return a + b + c;
}
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
