const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// 遍历对象的所有属性名
/* -------------------- 方法1：对象for-in -------------------- */
// for (const key in obj) {
//   console.log(key);
// }
/* -------------------- 方法2：数组forEach ------------------- */
Object.keys(obj).forEach((key) => console.log(key));

// 遍历对象的所有属性值
/* -------------------- 方法1：对象for-in -------------------- */
// for (const key in obj) {
//   console.log(obj[key]);
// }
/* -------------------- 方法2：数组for-of ------------------- */
for (const value of Object.values(obj)) {
  console.log(value);
}

// 遍历对象的所有属性名和属性值
/* -------------------- 方法1：对象for-in -------------------- */
// for (const key in obj) {
//   console.log(`${key}:${obj[key]}`);
// }
/* -------------------- 方法2：数组forEach, 并结构数组------------------- */
Object.entries(obj).forEach(([key, value]) => console.log(key, value));

// 复制obj的所有属性到一个新的对象
const newObj = { ...obj };
console.log(newObj);

// 复制obj除a以外的所有属性到一个新的对象
/* ------------------- 方法1：解构，并收集剩余参数 ------------------- */
const { a, ...newObj2 } = newObj;
console.log(newObj2);
/* -------------------- 方法2：转化为数组，再解构 ------------------- */
/* // 1.将对象转化从数组 [key, value]
const arr = Object.entries(obj);
console.log(arr);
// 2. 结构并收集剩余数组成员到新数组newArr
const [a, ...newArr] = arr;
console.log(newArr);
// 3. 数组newArr转化为对象
const newObj = Object.fromEntries(newArr);
console.log(newObj); */

// const [a, ...newArr] = Object.entries(obj);
// console.log(Object.fromEntries(newArr));
