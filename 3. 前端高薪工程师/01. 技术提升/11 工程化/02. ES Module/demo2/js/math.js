// ESM导出的结果可以看做一个对象
// 其有个属性default
// 其他属性是自定义（具名导出的属性名）
// {
//   default:{},
//   a:1,
//   b:2
// }

/* ------------------- 1. 具名导出2个函数 ------------------- */
export function sum(a, b) {
  return a + b;
}
export const isOdd = (num) => num % 2 === 0;

/* ------------------- 导出结果------------------- */
// {
//   sum, isOdd;
// }

/* --------------------- 2. 默认导出2个函数 -------------------- */
function minus(a, b) {
  return a - b;
}
const isDivBy3 = (num) => num % 3 === 0;

export default { minus, isDivBy3 };
/* ------------------- 导出结果------------------- */
// {
//   default:{ minus, isDivBy3 }
// }
