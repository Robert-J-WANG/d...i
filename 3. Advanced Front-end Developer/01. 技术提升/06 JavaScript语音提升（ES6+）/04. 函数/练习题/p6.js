// 根据下面的调用示例，编写User类

class User {
  constructor(name, pwd) {
    this.name = name;
    this.pwd = pwd;
  }
  sayHello() {
    console.log(`账号 —— ${this.name}，密码 —— ${this.pwd}`);
  }
}

const u = new User("account", "pwd123"); // 创建用户
u.sayHello(); // 输出：账号 —— account，密码 —— pwd123
