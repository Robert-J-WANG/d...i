/* 
1. 1~100求和
*/
// var sum = 0;
// for (var i = 1; i <= 100; i++) {
//   sum += i;
// }
// console.log(sum);

/* 
2. 求某个数的阶乘
5!=5*4*3*2*1
*/
// let res = 1;
// let n = 5;
// for (var i = n; i > 0; i--) {
//   res *= i;
// }
// console.log(res);

/* 
3. 数组求和
*/

// let sums = [1, 3, 5, 7, 9, 11];
// let res = 0;
// for (var i = 0; i < sums.length; i++) {
//   res += sums[i];
// }
// console.log(res);

/* 
4. 求数组中的奇数的个数
*/

// let nums = [1, 4, 3, 5, 66, 7, 9, 11, 12];
// let count = 0;
// for (var i = 0; i < nums.length; i++) {
//   if (nums[i] % 2 !== 0) {
//     count++;
//   }
// }
// console.log(count);

/* 
5. 求数组中的奇数和
*/
let nums = [1, 4, 3, 5, 67, 7, 9, 11, 12];
let sum = 0;
for (var i = 0; i < nums.length; i++) {
  if (nums[i] % 2 !== 0) {
    sum += nums[i];
  }
}
console.log(sum);
