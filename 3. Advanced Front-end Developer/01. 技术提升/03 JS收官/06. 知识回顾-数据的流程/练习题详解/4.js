/* 
1. 数组中是否存在某个数，输出 是 或 否
*/

// let arr = [1, 2, 4, 6, "abc"];
// let target = 5;
// let hasFound = false;
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] === target) {
//     hasFound = true;
//     break;
//   }
// }
// console.log(hasFound ? "是" : "否");

/* 
2. 数组中是否存在某个数，如果存在，则输出它所在的下标，如果不存在，则输出-1
*/
// let arr = [1, 2, 4, 6, "abc"];
// let index = -1;
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] === target) {
//     index = i;
//     break;
//   }
// }
// console.log(index);

/* 
3. 找到数组中第一个奇数和最后一个奇数，将它们求和
*/

/* ------------------------- 方法1 ------------------------ */
// let arr = [1, 22, 44, 99, 78];
// let newArr = []; // 存储所以奇数的数组
// let res = 0; // 记录求和结果
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] % 2 !== 0) {
//     newArr.push(arr[i]);
//   }
// }
// res = newArr[0] + newArr[newArr.length - 1];
// console.log(res);

/* ------------------------- 方法2 ------------------------ */
// let arr = [1, 22, 44, 99, 78];
// let first = null; // 记录第一个奇数
// let last = null; // 记录最后一个奇数
// // 找第一个奇数
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] % 2 !== 0) {
//     first = arr[i];
//     break;
//   }
// }
// // 找最后一个奇数
// for (let i = arr.length - 1; i >= 0; i--) {
//   if (arr[i] % 2 !== 0) {
//     last = arr[i];
//     break;
//   }
// }
// console.log(first + last);

/* 
4. 有两个数组，看两个数组中是否都存在奇数，输出 是 或 否
*/

let arr1 = [1, 22, 44, 99, 78];
let arr2 = [12, 24, 54, 66, 100];
let hasArr1Found = false;
let hasArr2Found = false;

for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] % 2 !== 0) {
    hasArr1Found = true;
    break;
  }
}
for (let i = 0; i < arr2.length; i++) {
  if (arr2[i] % 2 !== 0) {
    hasArr2Found = true;
    break;
  }
}
console.log(hasArr1Found && hasArr2Found ? "是" : "否");
