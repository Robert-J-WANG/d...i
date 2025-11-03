import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import "./BoardComp.css";

interface Iprops {
  chesses: ChessType[];
  isGameOver?: boolean;
  onClick?: (index: number) => void;
}

export const BoardComp = ({ chesses, onClick, isGameOver = false }: Iprops) => {
  const list = chesses.map((chess, i) => (
    <ChessComp
      type={chess}
      key={i}
      onClick={() => {
        if (onClick && !isGameOver) {
          onClick(i);
        }
      }}
    />
  ));
  return <div className="board">{list}</div>;
};
