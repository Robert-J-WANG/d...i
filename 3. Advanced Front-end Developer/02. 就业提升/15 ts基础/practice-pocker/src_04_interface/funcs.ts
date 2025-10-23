import { Point, Color } from "./enums";
import { Deck, Joker, NormalCard } from "./types";

export function createDeck(): Deck {
  const deck: Deck = [];

  // 添加数字牌
  const points = Object.values(Point);
  const colors = Object.values(Color);
  for (const p of points) {
    for (const c of colors) {
      deck.push({
        color: c,
        point: p,
        getStr: () => {
          return c + p;
        },
      } as NormalCard); // 方法1: 使用类型断言
    }
  }
  // 添加大小王
  let joker: Joker = {
    type: "jocker",
    getStr() {
      return "jocker";
    },
  };
  deck.push(joker); // 使用类型兼容性

  let JOCKER: Joker = {
    type: "JOCKER",
    getStr() {
      return "JOCKER";
    },
  };
  deck.push(JOCKER);

  return deck;
}

export function printDeck(deck: Deck) {
  let result = "";
  deck.forEach((card, i) => {
    let str = card.getStr();
    // 添加2个空字符
    result += str + "\t\t";
    // 每4个数换行
    if ((i + 1) % 4 === 0) {
      result += "\n";
    }
  });
  console.log(result);
}
