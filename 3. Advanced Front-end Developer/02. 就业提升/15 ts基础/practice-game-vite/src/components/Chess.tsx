import React from "react";
import { ChessType } from "../types/enums";
import "./Chess.css";

interface Iprops {
  chessType: ChessType;
  onClick?: () => void;
}

function Chess({ chessType, onClick }: Iprops) {
  let chess: React.ReactNode = null;
  if (chessType === ChessType.red) {
    chess = <div className="item red"></div>;
  } else if (chessType === ChessType.black) {
    chess = <div className="item black"></div>;
  }

  return (
    <div
      className="chess"
      onClick={() => {
        if (chessType === ChessType.none && onClick) {
          onClick();
        }
      }}
    >
      {chess}
    </div>
  );
}

export default Chess;
