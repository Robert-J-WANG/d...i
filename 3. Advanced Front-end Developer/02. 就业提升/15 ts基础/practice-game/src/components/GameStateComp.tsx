import { ChessType, GameState } from "../types/enums";
import "./GameStateComp.css";

interface Iprops {
  gameState: GameState;
  nextChess: ChessType.black | ChessType.red;
}

export const GameStateComp = ({ gameState, nextChess }: Iprops) => {
  if (gameState === GameState.gaming) {
    if (nextChess === ChessType.red) {
      return <div className="text red">红方落子</div>;
    } else {
      return <div className="text black">黑方落子</div>;
    }
  } else if (gameState === GameState.redwin) {
    return <div className="text red">红方胜</div>;
  } else if (gameState === GameState.blackwin) {
    return <div className="text black">黑方胜</div>;
  } else {
    return <div className="text">平局</div>;
  }
};
