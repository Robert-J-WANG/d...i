// 根据hero.js提供的数据heros，创建合适的元素，将英雄数据显示到页面上

function createHeroes() {
  var container = document.querySelector(".container");
  for (var i = 0; i < heros.length; i++) {
    var a = document.createElement("a");
    a.href =
      "https://pvp.qq.com/web201605/herodetail/" + heros[i].ename + ".shtml";
    a.target = "_blank";
    a.className = "item";
    var img = document.createElement("img");
    img.src =
      "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" +
      heros[i].ename +
      "/" +
      heros[i].ename +
      ".jpg";
    a.appendChild(img);
    var span = document.createElement("span");
    span.innerHTML = heros[i].cname;
    a.appendChild(span);
    container.appendChild(a);
  }
}
createHeroes();
