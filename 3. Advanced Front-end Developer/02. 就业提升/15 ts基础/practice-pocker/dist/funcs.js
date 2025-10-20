"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeck = createDeck;
exports.printDeck = printDeck;
const enums_1 = require("./enums");
function createDeck() {
    const deck = [];
    const points = Object.values(enums_1.Point);
    const colors = Object.values(enums_1.Color);
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
function printDeck(deck) {
    let result = "";
    deck.forEach((card, i) => {
        let str = card.color + card.point;
        result += str + "\t\t";
        if ((i + 1) % 4 === 0) {
            result += "\n";
        }
    });
    console.log(result);
}
