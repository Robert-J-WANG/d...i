function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + lastName;
}

// 正常创建对象
var u = new User("Jones", "Smith");

// 能否不使用new，通过User函数创建对象（不能更改User函数）????
var u2 = {};
User.call(u2, "Jones", "Smith");
console.log(u2);
