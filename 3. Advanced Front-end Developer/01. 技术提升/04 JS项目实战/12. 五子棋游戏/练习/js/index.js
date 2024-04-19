// 自定函数
function $(selector) {
  return document.querySelector(selector);
}
// 定义全局数据
var rows = 14; // 棋盘的行数
var cols = 14; // 棋盘的列数
var cheseColor = "white"; // 旗子初始颜色
var isGameOver = false;
var chessArr = [];

var table = $(".chessboard");

// 游戏开始，入口函数
main();

function main() {
  // 初始化-创建棋盘
  createChessTable();
  // 交互-落子下棋
  bindEvents();
}

function createChessTable() {
  // 获取棋盘
  var trStr = "";
  // 循环创建tr,td
  for (var i = 1; i <= rows; i++) {
    var tdStr = "";
    for (var j = 1; j <= cols; j++) {
      tdStr += `<td class="td" data-row=${i} data-col=${j}></td>`;
    }
    trStr += `<tr>` + tdStr + `</tr>`;
  }

  table.innerHTML = trStr;
}
function bindEvents() {
  table.onclick = function (e) {
    if (isGameOver) {
      // 游戏已经结束，需要询问是否要重新来一局
      if (window.confirm("是否要重新开始一局？")) {
        // 进行一些初始化操作
        chessArr = []; // 重置棋子的数组
        createChessTable(); // 重新绘制棋盘
        isGameOver = false;
      }
    } else {
      if (e.target.nodeName === "TD") {
        // 获取事件对象的宽高
        var width = (this.clientWidth / cols) * 0.92;
        var height = (this.clientHeight / rows) * 0.92;
        // 获取事件对象的行列位置
        var rowAndCol = e.target.dataset;
        // 获取鼠标点击的位置（在事件对象内的）
        var clickedX = e.offsetX;
        var clickedY = e.offsetY;

        // 确定棋子落下的位置
        var chessPoint = {
          x:
            clickedX > width / 2
              ? parseInt(rowAndCol.col) + 1
              : parseInt(rowAndCol.col),

          y:
            clickedY > height / 2
              ? parseInt(rowAndCol.row) + 1
              : parseInt(rowAndCol.row),
          color: cheseColor,
        };
        createChess(chessPoint);
      }
    }
  };
}

function createChess(chessPoint) {
  if (exist(chessPoint) || isGameOver) return;

  chessArr.push(chessPoint);
  var x = chessPoint.x,
    y = chessPoint.y,
    color = chessPoint.color;
  var chessDiv = `<div class="chess ${color}" data-col=${x}  data-row=${y}></div>`;
  if (x <= cols && y <= rows) {
    // 获取对应的td
    var pointTd = $(`td[data-col='${x}'][data-row='${y}']`);
    pointTd.innerHTML += chessDiv;
  }
  //   最右边一条线
  if (x > cols && y <= rows) {
    // 获取对应的td
    var pointTd = $(`td[data-col='${x - 1}'][data-row='${y}']`);
    pointTd.innerHTML += chessDiv;
    pointTd.lastChild.style.left = "50%";
  }
  //   最下边一条线
  if (x <= cols && y > rows) {
    // 获取对应的td
    var pointTd = $(`td[data-col='${x}'][data-row='${y - 1}']`);
    pointTd.innerHTML += chessDiv;
    pointTd.lastChild.style.top = "50%";
  }

  //   最下面一个点
  if (x > cols && y > rows) {
    // 获取对应的td
    var pointTd = $(`td[data-col='${x - 1}'][data-row='${y - 1}']`);
    pointTd.innerHTML += chessDiv;
    pointTd.lastChild.style.left = "50%";
    pointTd.lastChild.style.top = "50%";
  }
  cheseColor = cheseColor === "white" ? "black" : "white";

  //   每次下一个棋子，都检查是不是赢了
  checkWin();
}
// 判断该棋子是否已经存在
function exist(chessPoint) {
  var result = chessArr.find(function (item) {
    return item.x === chessPoint.x && item.y === chessPoint.y;
  });
  return result === undefined ? false : true;
}

// 检查游戏是否结束，检查是否有符合要求的棋子
function checkWin() {
  // 其实就是遍历数组里面的每一个棋子
  // 这里分为 4 种情况：横着、竖着、斜着（2 种）

  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i];
    var chess2, chess3, chess4, chess5;

    // 检查有没有横着的 5 个颜色一样的棋子
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y &&
        curChess.color === item.color
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y &&
        curChess.color === item.color
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y &&
        curChess.color === item.color
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y &&
        curChess.color === item.color
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 进入此 if，说明游戏结束
      end(curChess, chess2, chess3, chess4, chess5);
    }

    // 检查有没有竖着的 5 个颜色一样的棋子
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 1 &&
        curChess.color === item.color
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 2 &&
        curChess.color === item.color
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 3 &&
        curChess.color === item.color
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 4 &&
        curChess.color === item.color
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 进入此 if，说明游戏结束
      end(curChess, chess2, chess3, chess4, chess5);
    }

    // 检查有没有斜着的 5 个颜色一样的棋子
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y + 1 &&
        curChess.color === item.color
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y + 2 &&
        curChess.color === item.color
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y + 3 &&
        curChess.color === item.color
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y + 4 &&
        curChess.color === item.color
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 进入此 if，说明游戏结束
      end(curChess, chess2, chess3, chess4, chess5);
    }

    // 检查有没有斜着的 5 个颜色一样的棋子
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 1 &&
        curChess.y === item.y + 1 &&
        curChess.color === item.color
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 2 &&
        curChess.y === item.y + 2 &&
        curChess.color === item.color
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 3 &&
        curChess.y === item.y + 3 &&
        curChess.color === item.color
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 4 &&
        curChess.y === item.y + 4 &&
        curChess.color === item.color
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 进入此 if，说明游戏结束
      end(curChess, chess2, chess3, chess4, chess5);
    }
  }
}

function end() {
  if (!isGameOver) {
    isGameOver = true; // 代表游戏结束

    // 1. 把所有的棋子标记出来
    for (var i = 0; i < chessArr.length; i++) {
      chessArr[i];
      $(
        `div[data-row='${chessArr[i].y}'][data-col='${chessArr[i].x}']`
      ).innerHTML = i + 1;
    }

    // 2. 把获胜的棋子加上一个红色阴影
    for (var i = 0; i < arguments.length; i++) {
      $(
        `div[data-row='${arguments[i].y}'][data-col='${arguments[i].x}']`
      ).classList.add("win");
    }
  }
}
