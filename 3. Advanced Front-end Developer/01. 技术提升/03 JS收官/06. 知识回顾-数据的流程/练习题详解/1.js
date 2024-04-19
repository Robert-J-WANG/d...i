/* 
1. 输出100个hello world
*/

//固定次数的， 使用 for 循环
// for (let i = 1; i <= 100; i++) {
//   console.log("hello world " + i);
// }

/* 
2. 输出100~200
*/
// for (let i = 100; i <= 200; i++) {
//   console.log(i);
// }

/* 
3. 创建一个包含1~100的数组
*/
// let arr = [];
// for (let i = 1; i <= 100; i++) {
//   arr.push(i);
// }
// console.log(arr);

/* 
4. 定义一个数组，遍历输出它的每一项
*/

let arr2 = ["a", "b", "c", 1, 2, 3];
for (let i = 0; i < arr2.length; i++) {
  console.log(arr2[i]);
}
