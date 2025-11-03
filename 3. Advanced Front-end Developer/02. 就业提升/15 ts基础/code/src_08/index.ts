/* *
 * 从一个数组中取前n项，
 * @param arr
 * @param n
 * @returns 一个新的数组
 */

import { Dictionary } from "./Dictionary";

/* function take<T>(arr: T[], n: number): T[] {
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

const res = take<number>([1, 3, 4, 6, 8], 2); // number[]
console.log(res); // [ 1, 3 ]
const res2 = take(["1", "3", "4", " 6", "8"], 2); //string[]，不传入类型时，也可以进行类型推断
console.log(res2); // [ "1", "3" ] */

/* // 回调函数，判断数组中的某一项是否满足条件
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

const res2 = filter(
  ["1", "3", "4", "5", "7", "90", "101"],
  (n, i) => i % 2 !== 0
);

console.log(res2); // [ '3', '5', '90' ]
 */

// 回调函数，判断数组中的某一项是否满足条件
/* interface callback<T> {
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

const res2 = filter(
  ["1", "3", "4", "5", "7", "90", "101"],
  (n, i) => i % 2 !== 0
);

console.log(res2); // [ '3', '5', '90' ] 
*/

// class ArrayHelper<T> {
//   constructor(private arr: T[]) {}
//   /**
//    * 从数组里去前n个数
//    *
//    * @param n
//    * @returns
//    */
//   take(n: number): T[] {
//     if (n >= this.arr.length) {
//       return this.arr;
//     } else {
//       const newArr: T[] = [];
//       for (let i = 0; i < n; i++) {
//         newArr.push(this.arr[i]);
//       }
//       return newArr;
//     }
//   }

//   /**
//    * 洗牌
//    * 随机打乱数组成员的顺序
//    * @returns
//    */
//   shuffle(): T[] {
//     this.arr.forEach((n, i) => {
//       const targetIndex = this.getRandom(0, this.arr.length);
//       const temp = this.arr[i];
//       this.arr[i] = this.arr[targetIndex];
//       this.arr[targetIndex] = temp;
//     });
//     return this.arr;
//   }

//   /**
//    * 生成一个范围类的随机数，取不到最大值
//    * @param min
//    * @param max
//    * @returns
//    */
//   private getRandom(min: number, max: number) {
//     const dec = max - min;
//     return Math.floor(Math.random() * dec + min);
//   }
// }

// const arr = new ArrayHelper([1, 2, 3, 4, 5]);

// console.log(arr.take(2));
// console.log(arr.shuffle());

/* interface HasNameProperty {
  name: string;
}
 */
/* *
 * 将一个对象里的name属性的值的首字母大写
 * @param obj 一个对象，必须有name属性
 * @returns 包含首字母大写的name属性的对象
 */
/* function nameToUpperCase<T extends HasNameProperty>(obj: T): T {
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

const newO = nameToUpperCase(o); */

/**
 * 将多个数组混合：[1,2,3]+["4","5","6"] => [1,"4", 2,"5",3,"6"]
 */
/* function mixArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
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
console.log(res); */

const dic = new Dictionary<string, number>();

dic.set("a", 1);
dic.set("b", 2);
dic.set("a", 11);
dic.set("c", 3);
dic.set("d", 4);

dic.forEach((k, v) => {
  console.log(`${k}: ${v}`);
});

console.log(dic.has("a")); // true
console.log(dic.has("c")); // false

console.log("=====删除键b对应的键值对=======");
dic.delete("b");
dic.forEach((k, v) => {
  console.log(`${k}: ${v}`);
});

console.log(dic.size);
