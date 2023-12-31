// 数组去重
var nums = [1, 1, "1", "a", "b", "a", 3, 5, 3, 7, 9, "b"];

for (var i = 0; i < nums.length; i++) {
  for (var j = i + 1; j < nums.length; j++) {
    if (nums[j] === nums[i]) {
      nums.splice(j, 1);
      j--;
    }
  }
}

console.log(nums);
