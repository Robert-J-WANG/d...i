import { Deck } from "./deck";

const deck = new Deck();
deck.printDeck();

console.log("======进行洗牌======");
// 洗牌
deck.shuffle();
deck.printDeck();

// 发牌
console.log("=======进行发牌========");
const result = deck.dealDeck();

console.log("======玩家1======");
result.player1.printDeck();

console.log("======玩家2======");
result.player2.printDeck();

console.log("======玩家3======");
result.player3.printDeck();

console.log("======底牌======");
result.left.printDeck();
