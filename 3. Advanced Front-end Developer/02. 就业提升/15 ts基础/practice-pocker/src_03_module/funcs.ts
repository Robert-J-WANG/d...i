import { Point, Color } from "./enums";
import { Deck } from "./types";

export function createDeck(): Deck {
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

export function printDeck(deck: Deck) {
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
