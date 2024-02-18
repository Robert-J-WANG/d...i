import $ from "jquery";
// import url from "../.././1.png";
// 使用别名路径
import url from "@/1.png";

export default function createImg() {
  $("<img>").prop("src", url).appendTo(document.body);
}
