/* interface User {
  name: string;
  age: number;
  // 箭头函数
  sayHello: () => void;
  // 普通函数
  sayHi(): void;
} */

/* type User = {
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
 */
// interface Condition {
//   (n: number): boolean;
// }

// /* type Condition = {
//   (n: number): boolean;
// }; */

// function sum(numbers: number[], Callback: Condition) {
//   let result = 0;
//   numbers.forEach((n) => {
//     if (Callback(n)) {
//       result += n;
//     }
//   });
//   return result;
// }

/* // 对奇数求和
const result = sum([1, 2, 4, 5, 7, 11], (n) => n % 2 !== 0);
console.log(result); // 24
 */
/* interface A {
  t1: number;
}
interface B {
  t2: string;
}

interface C extends A, B {
  t1: string; // 不能重新覆盖（重写）父接口成员的类型
  t3: boolean;
} */

/* type A = {
  t1: number;
};
type B = {
  t2: string;
};

type C = {
  t1: string;
  t3: boolean;
} & A &
  B;

let c: C = {
  t1: 111,
  t2: "hahhaha",
  t3: false,
}; */

/* interface Student {
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

student.id = 2000; // 重新修改id
student.marks.push(99); // 无法修改数组成员,添加一个成绩 */

// 目标类型
/* interface Duck {
  sound: "gagaga";
  swim: () => void;
} */

// 赋值的类型
// const Person = {
//   name: "Peter",
//   age: 18,
//   sound: "gagaga" as "gagaga",
//   swim: () => {
//     console.log("i can swim");
//   },
// };

// 把赋值类型赋值给目标类型
/* let duck: Duck = {
  // name: "Peter",
  // age: 18,
  sound: "gagaga" as "gagaga",
  swim: () => {
    console.log("i can swim");
  },
};
 */
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
