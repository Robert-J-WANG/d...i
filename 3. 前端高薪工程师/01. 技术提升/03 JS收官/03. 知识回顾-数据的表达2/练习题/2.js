/* 
于谦，男，职业捧哏，手机号13812341234，江湖人称谦哥，家住北京八大胡同。
其父亲王老爷子是一位古汉语专家，爱好洗澡

用字面量描述上面的数据
*/

let obj = {
  name: "于谦",
  isMale: true, // 开发中对只有2种结果，使用布尔属性， 属性名通常是isXXX,hasXXX等
  job: "捧哏",
  mobile: "13812341234", // 手机号是字符串
  nickname: "谦哥",
  address: {
    city: "北京",
    street: "八大胡同",
  },
  parent: {
    name: "王老爷子",
    job: "古汉语专家",
    hobby: "洗澡",
  },
};

// 读取
console.log(obj.parent.hobby);
// obj.parent.hobby是个表达式，打印的是表达式的返回值
