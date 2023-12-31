/* 
使用原型重构之前的扑克牌程序
*/

/**
 * Deck 一副扑克牌
 */

/**
 * Poker 一张扑克牌
 * @ color{number} 花色{ 1:黑桃， 2：红桃， 3：梅花， 4：方片}
 * @ number {number} 扑克牌的点数：1-A, 11-J, 12-Q, 13-K, 14-小王, 15-大王
 */
function Poker(color, number) {
  this.color = color;
  this.number = number;
}
// 把方法放到原型对象prototype中
Poker.prototype.print = function () {
  var colors = ["♠️", "♥", "♣", "♦"];
  var numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  if (this.number === 14) {
    console.log("joker");
    return;
  }
  if (this.number === 15) {
    console.log("JOKER");
    return;
  }
  console.log(colors[this.color - 1] + numbers[this.number - 1]);
};
// var poker = new Poker(1, 15);
// poker.print();

function Deck() {
  this.pokers = [];
  for (var i = 1; i <= 13; i++) {
    for (var j = 1; j <= 4; j++) {
      this.pokers.push(new Poker(j, i));
    }
  }
  this.pokers.push(new Poker(0, 14), new Poker(0, 15));
}
// 把方法放到原型对象prototype中
Deck.prototype.print = function () {
  for (var k = 0; k < this.pokers.length; k++) {
    this.pokers[k].print();
  }
};

var deck = new Deck();
console.log(deck.pokers);
deck.print();
