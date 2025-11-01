import { ChessType, GameState } from "../types/enums";

interface Iprops {
  gameState: GameState;
  nextChess: ChessType.red | ChessType.black;
}
function GameStateComp(props: Iprops) {
  let context = null;
  if (props.gameState === GameState.gaming) {
    if (props.nextChess === ChessType.red) {
      context = "红方落子";
    } else {
      context = "黑方落子";
    }
  } else if (props.gameState === GameState.redwin) {
    context = "红方胜利";
  } else if (props.gameState === GameState.blackwin) {
    context = "黑方胜利";
  } else {
    context = "平局";
  }

  return <h3>{context}</h3>;
}

export default GameStateComp;
