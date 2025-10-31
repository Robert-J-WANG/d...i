import React from "react";
import { ChessType, GameState } from "../types/enums";
import { BoardComp } from "./BoardComp";
import { GameStateComp } from "./GameStateComp";

interface Istate {
  chesses: ChessType[];
  gameState: GameState;
  nextChess: ChessType.black | ChessType.red;
}

export class GameComp extends React.Component<{}, Istate> {
  state: Istate = {
    chesses: [],
    gameState: GameState.gaming,
    nextChess: ChessType.black,
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    let arr = [];
    for (let index = 0; index < 9; index++) {
      arr.push(ChessType.none);
    }
    this.setState({
      chesses: arr,
      gameState: GameState.gaming,
      nextChess: ChessType.black,
    });
  }

  handlerOnClick(index: number) {
    // 处理落子逻辑
    // this.state.chesses[i]=this.state.nextChess

    let newChesses = [...this.state.chesses];
    newChesses[index] = this.state.nextChess;
    this.setState((prevState) => ({
      chesses: newChesses,
      nextChess:
        prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
      gameState: this.getGameState(newChesses, index),
    }));
  }

  getGameState(chesses: ChessType[], index: number): GameState {
    /* [0 1 2
        3 4 5
        6 7 8] */
    // 1. 某一方获胜
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
      if (chesses[index] === ChessType.red) {
        return GameState.redwin;
      } else {
        return GameState.blackwin;
      }
    }
    // 2. 平局
    if (!chesses.includes(ChessType.none)) {
      return GameState.tie;
    }
    // 3. 游戏进行中
    return GameState.gaming;
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>井字棋</h1>
        <GameStateComp
          gameState={this.state.gameState}
          nextChess={this.state.nextChess}
        />
        <BoardComp
          chesses={this.state.chesses}
          isGameOver={this.state.gameState !== GameState.gaming}
          onClick={(index) => {
            this.handlerOnClick(index);
          }}
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
