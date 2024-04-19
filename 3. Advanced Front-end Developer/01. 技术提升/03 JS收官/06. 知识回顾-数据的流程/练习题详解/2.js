/* 
1. 输出1-100的所有奇数
*/

// for (var i = 1; i <= 100; i++) {
//   if (i % 2 !== 0) {
//     console.log(i);
//   }
// }

/* 
2. 定义一个数组，输出数组中所有的奇数
*/

// let nums = [1, 3, 2, 5, 6, 7, 98, 3, 3, 78, 123];
// for (var i = 0; i < nums.length; ++i) {
//   if (nums[i] % 2 !== 0) {
//     console.log(nums[i]);
//   }
// }

/* 
3. 定义一个数组，找出所有的奇数，放入到一个新数组中
*/
let nums = [1, 3, 2, 5, 6, 7, 98, 33, 32, 78, 123];
let newNums = [];
for (var i = 0; i < nums.length; ++i) {
  if (nums[i] % 2 !== 0) {
    newNums.push(nums[i]);
  }
}
console.log(newNums);
