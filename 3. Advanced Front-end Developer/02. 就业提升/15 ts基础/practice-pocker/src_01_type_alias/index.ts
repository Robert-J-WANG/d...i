// ts 练习： 创建一副扑克牌（不包含大小王），并打印出来

type Deck = Card[];
type Card = {
  color: "♥" | "♠" | "♣" | "♦";
  point: number;
};

function createDeck(): Deck {
  const deck: Deck = [];

  for (let i = 1; i <= 13; i++) {
    deck.push({
      color: "♠",
      point: i,
    });
    deck.push({
      color: "♥",
      point: i,
    });
    deck.push({
      color: "♣",
      point: i,
    });
    deck.push({
      color: "♦",
      point: i,
    });
  }
  return deck;
}

/* const deck = createDeck();
console.log(deck);
 */

function printDeck(deck: Deck) {
  let result = "";
  deck.forEach((card, i) => {
    let str = card.color;
    if (card.point === 11) {
      str += "J";
    } else if (card.point === 12) {
      str += "Q";
    } else if (card.point === 13) {
      str += "K";
    } else {
      str += card.point;
    }
    // 添加2个空字符
    result += str + "\t\t";
    // 每4个数换行
    if ((i + 1) % 4 === 0) {
      result += "\n";
    }
  });
  console.log(result);
}
const deck = createDeck();
printDeck(deck);
