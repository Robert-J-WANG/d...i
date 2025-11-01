import { ChessType } from "../types/enums";
import Chess from "./Chess";
import "./Board.css";

interface Iprops {
  chesses: ChessType[];
  isGameOver: boolean;
  onClick?: (index: number) => void;
}

function Board(props: Iprops) {
  const list = props.chesses.map((chess, i) => (
    <Chess
      key={i}
      chessType={chess}
      onClick={() => {
        if (!props.isGameOver) {
          props.onClick?.(i);
        }
      }}
    />
  ));
  return <div className="board">{list}</div>;
}
export default Board;
