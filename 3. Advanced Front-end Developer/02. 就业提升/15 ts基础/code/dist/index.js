class User {
    constructor(name, _age, pid) {
        this.name = name;
        this._age = _age;
        this.pid = pid;
        this.gender = "male";
        this._publishNumber = 3;
        this._curPublish = 0;
        this.id = Math.random();
    }
    set age(value) {
        if (value < 0) {
            value = 0;
        }
        if (value >= 200) {
            value = 200;
        }
        this._age = value;
    }
    get age() {
        return Math.floor(this._age);
    }
    publish(title) {
        if (this._curPublish < this._publishNumber) {
            console.log(title + " is published");
            this._curPublish++;
        }
        else {
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
