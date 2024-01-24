/**
 * 创建一个用户对象
 * 对象格式：
 * {
 *    firstName: xxx,
 *    lastName: xxx,
 *    fullName: xxx,
 *    sayHello: fn
 * }
 */
function createUser(firstName, lastName) {
  return {
    firstName,
    lastName,
    fullname: `${firstName} ${lastName}`,
    sayHello() {
      console.log(`hello, my name is ${fullname}`);
    },
  };
}

// 调用createUser函数，使用解构得到fullName
const { fullname, sayHello } = createUser("三", "张");
console.log(fullname);
sayHello();
