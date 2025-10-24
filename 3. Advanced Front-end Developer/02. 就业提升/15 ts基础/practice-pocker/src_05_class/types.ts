import { Color, Point } from "./enums";

// export type Deck = Card[]; // 修改成类

export interface Card {
  getStr: () => string;
}

export interface NormalCard extends Card {
  color: Color;
  point: Point;
}

export interface Joker extends Card {
  type: "jocker" | "JOCKER";
}
