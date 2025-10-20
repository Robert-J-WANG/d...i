import { Color, Point } from "./enums";

export type Deck = Card[];
export type Card = {
  color: Color;
  point: Point;
};
