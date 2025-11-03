export enum ChessType {
  none,
  red,
  black,
}

export enum GameState {
  /**
   * 游戏正在进行
   */
  gaming,
  /**
   * 红方胜
   */
  redwin,
  /**
   * 黑方胜
   */
  blackwin,
  /**
   * 平局
   */
  tie,
}
