import React from "react";
import { ChessType, GameState } from "../types/enums";
import Board from "./Board";
import GameStateComp from "./GameStateComp";

interface Istate {
  chesses: ChessType[];
  gameState: GameState;
  nextChess: ChessType.red | ChessType.black;
}
export default class Game extends React.Component<{}, Istate> {
  state: Istate = {
    chesses: [],
    gameState: GameState.gaming,
    nextChess: ChessType.red,
  };

  handlerChessClick(i: number) {
    // console.log(i);
    const newChesses = [...this.state.chesses];
    newChesses[i] = this.state.nextChess;
    this.setState((prevState) => ({
      chesses: newChesses,
      nextChess:
        prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameState: this.getGameState(newChesses, i),
    }));
  }

  getGameState(chesses: ChessType[], index: number) {
    const horMin = Math.floor(index / 3) * 3;
    const verMin = index % 3;
    if (
      (chesses[horMin] === chesses[horMin + 1] &&
        chesses[horMin] === chesses[horMin + 2]) ||
      (chesses[verMin] === chesses[verMin + 3] &&
        chesses[verMin] === chesses[verMin + 6]) ||
      (chesses[2] === chesses[4] &&
        chesses[2] === chesses[6] &&
        chesses[2] !== ChessType.none) ||
      (chesses[0] === chesses[4] &&
        chesses[0] === chesses[8] &&
        chesses[0] !== ChessType.none)
    ) {
      return chesses[index] === ChessType.red
        ? GameState.redwin
        : GameState.blackwin;
    } else if (!chesses.includes(ChessType.none)) {
      return GameState.tie;
    }
    return GameState.gaming;
  }

  init() {
    const chesses: ChessType[] = [];
    for (let index = 0; index < 9; index++) {
      chesses.push(ChessType.none);
    }
    this.setState({
      chesses,
      gameState: GameState.gaming,
    });
  }
  componentDidMount(): void {
    this.init();
  }
  render() {
    return (
      <div>
        <GameStateComp
          gameState={this.state.gameState}
          nextChess={this.state.nextChess}
        />
        <Board
          chesses={this.state.chesses}
          isGameOver={this.state.gameState !== GameState.gaming}
          onClick={(i) => this.handlerChessClick(i)}
        />
        <button
          onClick={() => {
            this.init();
          }}
        >
          重新开始
        </button>
      </div>
    );
  }
}
