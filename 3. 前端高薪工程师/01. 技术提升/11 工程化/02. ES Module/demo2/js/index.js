// 导入模块有2种方式：具名导入，默认导入
/* ---------------------- 1.具名导入函数 ---------------------- */
// import { sum, isOdd } from "./math.js";
/* ---------------------- 2. 默认导入函数 --------------------- */
// import math from "./math/js";
// math = {minus, isDivBy3 };

/* ---------------------- 3.混合导入---------------------- */
import math, { sum, isOdd } from "./math.js";

console.log(sum(1, 2)); // 3
console.log(isOdd(100)); // true
console.log(math.minus(100, 55)); // 45
console.log(math.isDivBy3(100)); // false
