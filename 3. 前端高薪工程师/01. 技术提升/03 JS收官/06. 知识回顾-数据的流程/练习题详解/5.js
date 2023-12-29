/* 
1. 输出一个对象的所有键值对
    循环对象使用 for(key in obj){}
*/

var obj = {
  name: "邓哥",
  age: 60,
  sex: "男",
};

for (key in obj) {
  console.log(key + "=" + obj[key]);
}
/* 
2. 计算对象中字符串属性的数量
*/

let count = 0;
for (key in obj) {
  if (typeof obj[key] === "string") {
    count++;
  }
}
console.log(count);

/* 
3. 将一个对象所有的数字属性，转换为字符串，并在其前面加上￥
例如：
{
    name:"xxx",
    balance: 199.8, //余额
    taken: 3000 //消费
}
-->
{
    name:"xxx",
    balance: '￥199.8', //余额
    taken: '￥3000' //消费
}
*/
/* ---------------------- 方法1：改变原对象 --------------------- */
// let account = {
//   name: "xxx",
//   balance: 199.8, //余额
//   taken: 3000, //消费
// };
// for (const key in account) {
//   if (typeof account[key] === "number") {
//     account[key] = "$" + account[key];
//   }
// }
// console.log(account);

/* --------------------- 方法2：不改变原对象 --------------------- */
let account = {
  name: "xxx",
  balance: 199.8, //余额
  taken: 3000, //消费
};
let newAccount = {};
for (const key in account) {
  if (typeof account[key] === "number") {
    newAccount[key] = "$" + account[key];
  } else {
    newAccount[key] = account[key];
  }
}
console.log(newAccount);

/* 
4. 按照下面的要求进行转换
[1, 2, 3]  
-->
[
    {number:1, doubleNumber: 2},
    {number:2, doubleNumber: 4},
    {number:3, doubleNumber: 6},
]
*/
let nums = [1, 2, 3];

let newNums = [];

for (var i = 0; i < nums.length; i++) {
  newNums.push({ number: nums[i], doubleNumber: nums[i] * 2 });
}
console.log(newNums);
