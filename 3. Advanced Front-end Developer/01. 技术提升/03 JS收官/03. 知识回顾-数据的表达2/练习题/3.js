/* 
  有一个非常特别的对象，它的键值对是：
  0: 'a'
  1: 'b'
  how are you: 'fine thank you'
*/
// 用字面量表示该对象，然后分别读取它的每个属性输出

let obj = {
  0: "a", // 符合命名规范，使用简写方式（去掉引号）
  1: "b", // 符合命名规范，使用简写方式（去掉引号）
  "how are you": "fine thank you", // 不符合命名规范，不能使用简写方式（不能去掉引号）
};

console.log(obj); // { '0': 'a', '1': 'b', ' how are you': 'fine thank you' }

console.log(obj[0]);
console.log(obj["0"]);
console.log(obj["how are you"]);

let obj2 = {
  name: "邓哥",
  age: 35,
  "graduate date": "2007-7-1",
  "home address": {
    province: "黑龙江",
    city: "哈尔滨",
  },
};
console.log(obj2["home address"].city);
