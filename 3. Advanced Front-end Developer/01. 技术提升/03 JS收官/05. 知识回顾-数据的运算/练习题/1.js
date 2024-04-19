/* 
编写一个完美的求和函数：
1. 若两个数据都是普通数字，求和即可
2. NaN的数据需要变为0
3. 其他类型的数据需要转换为数字
*/

function sum(a, b) {
  // code here
  // 正常写法
  // a = +a;
  // if (isNaN(a)) a = 0;
  // b = +b;
  // if (isNaN(b)) b = 0;

  // 使用短路写法
  a = +a || 0;
  b = +b || 0;

  return a + b;
}
console.log(sum("abc", 3));
