import { ChessType } from "../types/enums";
import "./ChessComp.css";

interface Iprops {
  type: ChessType;
  onClick?: () => void;
}
export const ChessComp = ({ type, onClick }: Iprops) => {
  let chess = null;
  if (type === ChessType.black) {
    chess = <div className="black chess-item"></div>;
  } else if (type === ChessType.red) {
    chess = <div className="red chess-item"></div>;
  }
  return (
    <div
      className="chess"
      onClick={() => {
        if (type === ChessType.none && onClick) {
          onClick();
        }
      }}
    >
      {chess}
    </div>
  );
};
