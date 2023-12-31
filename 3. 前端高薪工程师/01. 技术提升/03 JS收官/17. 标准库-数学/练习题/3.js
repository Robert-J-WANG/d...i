/**
 * 从一个数组中随机取出一项
 * @param {any[]} arr 数组
 * @return {any} 数组的随机一项
 */
function getRandomItem(arr) {
  return arr[getRandom(0, arr.length)];
}

console.log(getRandomItem([1, 2, 3, "abc"]));
/**
 * 得到一个指定范围内的随机整数
 * @param {number} min 范围的最小值
 * @param {number} max 范围的最大值（无法取到最大值）
 * @return {number} 范围内的随机整数 [min, max)
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
