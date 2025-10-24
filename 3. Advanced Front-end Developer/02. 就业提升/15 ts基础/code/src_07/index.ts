/* class User {
  // 定义类的时候，必须要明确类的成员
  name: string;
  age: number;
  constructor(name: string, age: number) {
    // 给当前的属性赋值
    this.name = name;
    this.age = age;
  }
}

let u = new User("Sam", 18);
console.log(u); */

/* class User {
  // 定义类的时候，必须要明确类的成员
  name: string;
  age: number;
}

let u = new User();
console.log(u); // User {}
u.name = "sam";
u.age = 19;

console.log(u); // User { name: 'sam', age: 19 }
 */

/* class User {
  // 定义类的时候，必须要明确类的成员
  name: string;
  age: number;
  constructor(name: string, age: number) {
    // 忘记给属性赋值
  }
}

let u = new User("sam", 18); // 虽然传递了参数，但是无法完成赋值
console.log(u); // User {}
u.name = "sam";
u.age = 19;

console.log(u); // User { name: 'sam', age: 19 } */

/* class User {
  // 定义类的时候，必须要明确类的成员
  name: string;
  age: number;
  gender: "male" | "female" = "male"; // 设置属性默认值
  constructor(name: string, age: number) {
    // 给属性赋值
    this.name = name;
    this.age = age;
  }
}

let u = new User("sam", 18);
console.log(u);
u.gender = "female";
console.log(u);
 */

/* class User {
  // 定义类的时候，必须要明确类的成员
  name: string;
  age: number;
  gender: "male" | "female";
  // 通过构造函数，给属性赋值，设置默认值
  constructor(name: string, age: number, gender: "male" | "female" = "male") {
    // 给属性赋值
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

let u = new User("sam", 18);
console.log(u);
u.gender = "female";
console.log(u); */

/* class User {
  name: string;
  age: number;
  gender: "male" | "female" = "male";
  id?: string; // 可选属性

  constructor(name: string, age: number, id?: string) {
    // 给属性赋值
    this.name = name;
    this.age = age;
    this.id = id;
  }
}

let u = new User("sam", 18);
console.log(u);
let u2 = new User("sam", 18, "200002000");
console.log(u2); */

/* class User {
  readonly id: number; // 设置为只读属性
  name: string;
  age: number;
  gender: "male" | "female" = "male";
  pid?: string; // 可选属性

  constructor(name: string, age: number, pid?: string) {
    // 给属性赋值
    this.id = Math.random();
    this.name = name;
    this.age = age;
    this.pid = pid;
  }
}

let u = new User("sam", 18, "10000100");
console.log(u.id); // id属性可以读取

u.id = 1238409138493; // 但是不能修改： Cannot assign to 'id' because it is a read-only property. */

/* class User {
  public readonly id: number; // 设置为只读属性
  public name: string;
  age: number;
  gender: "male" | "female" = "male";
  pid?: string; // 可选属性

  constructor(name: string, age: number, pid?: string) {
    // 给属性赋值
    this.id = Math.random();
    this.name = name;
    this.age = age;
    this.pid = pid;
  }
}

let u = new User("sam", 18, "10000100");
console.log(u.id);
console.log(u.age);
console.log(u.name);
console.log(u.gender);
console.log(u.pid);
 */

/* class User {
  public readonly id: number; // 设置为只读属性
  public name: string;
  age: number;
  gender: "male" | "female" = "male";
  pid?: string; // 可选属性

  private publishNumber: number = 3; // 一天能发布文章的上限值
  private curPublish: number = 0; // 当前发布的文章数

  constructor(name: string, age: number, pid?: string) {
    // 给属性赋值
    this.id = Math.random();
    this.name = name;
    this.age = age;
    this.pid = pid;
  }

  publish(title: string) {
    if (this.curPublish < this.publishNumber) {
      console.log(title + " is published");
      this.curPublish++;
    } else {
      console.log("you can not publish today");
    }
  }
}

let u = new User("sam", 18, "10000100");
u.publish("title 1");
u.publish("title 2");
u.publish("title 3");
u.publish("title 4");

u.publishNumber = 100; // 报错，外部无法操作私有属性：Property 'publishNumber' is private and only accessible within class 'User'.ts(2341)
 */

/* class User {
  public readonly id: number; // 设置为只读属性
  gender: "male" | "female" = "male";
  private publishNumber: number = 3; // 一天能发布文章的上限值
  private curPublish: number = 0; // 当前发布的文章数

  constructor(public name: string, public age: number, public pid?: string) {
    // 给属性赋值
    this.id = Math.random();
  }

  publish(title: string) {
    if (this.curPublish < this.publishNumber) {
      console.log(title + " is published");
      this.curPublish++;
    } else {
      console.log("you can not publish today");
    }
  }
}

let u = new User("sam", 18, "10000100");
u.publish("title 1");
u.publish("title 2");
u.publish("title 3");
u.publish("title 4");
 */

/* class User {
  public readonly id: number; // 设置为只读属性
  gender: "male" | "female" = "male";
  private _publishNumber: number = 3; // 一天能发布文章的上限值
  private _curPublish: number = 0; // 当前发布的文章数

  constructor(public name: string, private _age: number, public pid?: string) {
    // 给属性赋值
    this.id = Math.random();
  }

  // 对属性进行处理
  setAge(value: number) {
    // 设置年龄范围
    if (value < 0) {
      value = 0;
    }
    if (value >= 200) {
      value = 200;
    }
    this._age = value;
  }

  getAge() {
    // 对年龄取整
    return Math.floor(this._age);
  }

  publish(title: string) {
    if (this._curPublish < this._publishNumber) {
      console.log(title + " is published");
      this._curPublish++;
    } else {
      console.log("you can not publish today");
    }
  }
}

let u = new User("sam", 18, "10000100");
let age = u.getAge();
console.log(age);

u.setAge(100);
let age2 = u.getAge();
console.log(age2);

u.setAge(300);
let age3 = u.getAge();
console.log(age3);

u.setAge(100.456);
let age4 = u.getAge();
console.log(age4); */

class User {
  public readonly id: number; // 设置为只读属性
  gender: "male" | "female" = "male";
  private _publishNumber: number = 3; // 一天能发布文章的上限值
  private _curPublish: number = 0; // 当前发布的文章数

  constructor(public name: string, private _age: number, public pid?: string) {
    // 给属性赋值
    this.id = Math.random();
  }

  // 对属性进行处理
  set age(value: number) {
    // 设置年龄范围
    if (value < 0) {
      value = 0;
    }
    if (value >= 200) {
      value = 200;
    }
    this._age = value;
  }

  get age() {
    // 对年龄取整
    return Math.floor(this._age);
  }

  publish(title: string) {
    if (this._curPublish < this._publishNumber) {
      console.log(title + " is published");
      this._curPublish++;
    } else {
      console.log("you can not publish today");
    }
  }
}

let u = new User("sam", 18, "10000100");
console.log(u.age);

u.age = 100;
console.log(u.age);

u.age = 300;
console.log(u.age);

u.age = 100.465;
console.log(u.age);
