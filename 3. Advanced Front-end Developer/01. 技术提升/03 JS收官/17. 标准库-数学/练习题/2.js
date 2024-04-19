/**
 * 得到一个指定长度的随机字符串
 * 字符串包含：数字、字母
 * @param {number} length 字符串的长度
 * @return {number} 随机字符串
 */
/* ------------------------- 方法1 ------------------------ */
function getRandomString(length) {
  var str = "0123456789abcdefghijklmnopqrstuvwxyz";
  var res = "";
  for (var i = 1; i <= length; i++) {
    res += str[getRandom(0, str.length)]; // 取不到 max-str.length
  }
  return res;
}
console.log(getRandomString(100));

/* ------------------------- 方法2 ------------------------ */
function getRandomString2(length) {
  return Math.random()
    .toString(36) // 转换为36进制字符串
    .substring(2, length + 2);
}
getRandomString2(7);

/**
 * 得到一个指定范围内的随机整数
 * @param {number} min 范围的最小值
 * @param {number} max 范围的最大值（无法取到最大值）
 * @return {number} 范围内的随机整数 [min, max)
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
