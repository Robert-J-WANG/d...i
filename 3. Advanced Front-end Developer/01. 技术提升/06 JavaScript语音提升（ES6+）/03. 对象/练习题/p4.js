// 遍历对象 user， 将其每一个属性变为 getter 和 setter， 保持读写功能不变
// 读取属性时，输出：正在读取xxx属性，值为xxx
// 给属性赋值时，输出：正在设置xxx属性，新的值为xxx
const user = {
  name: "monica",
  age: 17,
  sex: "female",
};

// Object.defineProperty(user, "name", {
//   get() {
//     console.log("正在读取属性name");
//     return user["name"];
//   },
//   set(value) {
//     console.log("正在设置属性name");
//     return "value";
//   },
// });

// 遍历对象 user,拿到每一个属性名和属性值
Object.entries(user).forEach(([key, value]) => {
  // console.log(key, value);
  // 对该属性进行重新定义描述符
  Object.defineProperty(user, key, {
    get() {
      console.log(`正在读取属性${key},属性值是${value}`);
      return value;
    },
    set(val) {
      console.log(`正在设置属性${key},属性值是${val}`);
      value = val;
    },
  });
});

const sex = user.sex;
console.log(sex);
user.name = "Lucas";
console.log(user.name);
