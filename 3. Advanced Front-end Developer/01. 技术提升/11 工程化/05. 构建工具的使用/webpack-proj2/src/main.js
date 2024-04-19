import a from "./a";
import b from "./b";
import "./index.less";
import $ from "jquery";
// 资源模块需要动态获取路径
// 可使用路径别名，简化路径的书写层级
import url from "@/1.png";
import createImg from "./demo/demoImg/a";

console.log(a, b);
console.log($);
$("<div><p>Hello</p></div>").appendTo(document.body);
$("<div><p>Hello World!!</p></div>").appendTo(document.body);
console.log(url);
/* --------------------- 这样写，找不到图片路径 -------------------- */
// $("<img/>").prop("src", "./1.png").appendTo(document.body);
/* -------------------- 需要使用资源模块的动态路径 ------------------- */
$("<img/>").prop("src", url).appendTo(document.body);
createImg();

async function test() {}
test();
