// ts 练习： 创建一副扑克牌（不包含大小王），并打印出来
enum Color {
  heart = "♥",
  spade = "♠",
  club = "♣",
  diamond = "♦",
}
enum Point {
  A = "A",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
  ten = "10",
  J = "11",
  Q = "12",
  K = "13",
}

type Deck = Card[];
type Card = {
  color: Color;
  point: Point;
};

function createDeck(): Deck {
  const deck: Deck = [];

  const points = Object.values(Point);
  const colors = Object.values(Color);
  for (const p of points) {
    for (const c of colors) {
      deck.push({
        color: c,
        point: p,
      });
    }
  }

  return deck;
}
/* const deck = createDeck();
console.log(deck); */

function printDeck(deck: Deck) {
  let result = "";
  deck.forEach((card, i) => {
    let str = card.color + card.point;
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
