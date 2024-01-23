// 得到一个随机数组成的数组，数组长度为10，随机数的范围在0-1之间
// 结果类似于：[0.262, 0.167, 0.841, ...]
/* 
const arr = new Array(10);
arr.fill(0);
console.log(arr);
const newArray = arr.map(function (item) {
  return (item = Math.random());
});
console.log(newArray); 
*/
const newArray = new Array(10).fill(0).map((item) => (item = Math.random()));
console.log(newArray);

// 得到一个随机数组成的数组，数组长度为10，随机数的范围在10-100之间
// 结果类似于：[35, 66, 45, ...]
const newArray2 = new Array(10)
  .fill(0)
  .map((item) => (item = Math.floor(Math.random() * (100 - 10) + 10)));
console.log(newArray2);
// 判断某个字符串s是否为 .jpg、.png、.bmp、.gif 中的一个
const imgArr = [".jpg", ".png", ".bmp", ".gif"];
const s = ".png";
const res = imgArr.includes(s);
console.log(res);
