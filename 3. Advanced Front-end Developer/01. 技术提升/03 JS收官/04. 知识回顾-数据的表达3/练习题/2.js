/* 
邓哥，81岁，爱好香菜、秋葵、遛鸟
成哥，30岁，爱好扯淡、找邓嫂
monica，17岁，爱好奶茶、唱歌

用字面量描述上面的信息

思考：
1. 如何得到平均年龄
2. 如何得到所有人所有爱好的总数
*/
let teachers = [
  { name: "邓哥", age: 81, hobby: "香菜、秋葵、遛鸟" },
  { name: "成哥", age: 30, hobby: "扯淡、找邓嫂" },
  { name: "monica", age: 17, hobby: "奶茶、唱歌" },
];

console.log(teachers[0]["name"]);
console.log(teachers[1].hobby);
console.log((teachers[0].age + teachers[1]["age"] + teachers[2]["age"]) / 3);
