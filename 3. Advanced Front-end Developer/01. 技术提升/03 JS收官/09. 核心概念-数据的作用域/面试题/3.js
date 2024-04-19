// 下面的代码输出什么？(百度)

var a = 1;

function m1() {
  a++; //2
}

function m2() {
  var a = 3;
  m1();
  console.log(a);
}

m2(); //3
console.log(a); //2
