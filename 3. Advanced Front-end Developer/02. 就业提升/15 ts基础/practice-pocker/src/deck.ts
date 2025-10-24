import { Point, Color } from "./enums";
import { Card, NormalCard, Joker } from "./types";

interface DealCardsResult {
  player1: Deck;
  player2: Deck;
  player3: Deck;
  left: Deck;
}

export class Deck {
  // 属性列表
  private cards: Card[] = [];

  // 构造器
  constructor(cards?: Card[]) {
    if (cards) {
      this.cards = cards;
    } else {
      this.init();
    }
  }

  // 初始化：生成一副扑克牌
  private init() {
    // 添加数字牌
    const points = Object.values(Point);
    const colors = Object.values(Color);
    for (const p of points) {
      for (const c of colors) {
        this.cards.push({
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
    this.cards.push(joker); // 使用类型兼容性

    let JOCKER: Joker = {
      type: "JOCKER",
      getStr() {
        return "JOCKER";
      },
    };
    this.cards.push(JOCKER);

    return this.cards;
  }

  // 打印扑克牌
  printDeck() {
    let result = "";
    this.cards.forEach((card, i) => {
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

  // 洗牌
  shuffle() {
    // 生成一个随机数，并以此交换随机数和扑克牌数组的下标，来打乱数组的顺序
    for (let i = 0; i < this.cards.length; i++) {
      let targetIndex = this.getRandom(0, this.cards.length);
      let temp = this.cards[i];
      this.cards[i] = this.cards[targetIndex];
      this.cards[targetIndex] = temp;
    }
  }

  //发牌, 返回的结果是4摞牌，4个cards数组
  dealDeck(): DealCardsResult {
    let player1: Deck, player2: Deck, player3: Deck, left: Deck;
    player1 = this.takeCards(17);
    player2 = this.takeCards(17);
    player3 = this.takeCards(17);
    left = new Deck(this.cards);

    return {
      player1,
      player2,
      player3,
      left,
    };
  }

  // 辅助函数：抓牌
  private takeCards(n: number): Deck {
    const cards: Card[] = [];
    for (let i = 0; i < n; i++) {
      cards.push(this.cards.shift() as Card);
    }
    return new Deck(cards);
  }

  // 辅助函数： 生成一个范围类的随机数(取不到最大值)
  private getRandom(min: number, max: number) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + min);
  }
}
