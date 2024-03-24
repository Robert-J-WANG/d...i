import React, { useEffect, useState } from "react";

/* --------------------- 副作用：操作dom元素 -------------------- */

// 获取dom
const divRef = React.createRef();
let timer = null;
/**
 * 一个可以移动的块，该组件每次渲染完成后，始终从（0,0）坐标位置，在1秒内
 * 移动到目标坐标位置
 * @param {*} props
 * props.left: 要移动到的目标横坐标
 * props.top:移动到的目标纵坐标
 * @returns
 */
function MovablePanel(props) {
  // 定义一个定时器结束的函数
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  // 副作用：操作dom的left,top,使用uesEffect钩子
  useEffect(() => {
    // 这个函数执行的时间：当组件页面初次渲染或者更新渲染完成后
    const duration = 10; //动画的间隔时间
    const tatalTime = 1000; //完成动画的总时间
    const time = tatalTime / duration;
    const stepTop = props.top / time;
    const stepLeft = props.left / time;
    let curTime = 0;
    timer = setInterval(() => {
      curTime++;
      divRef.current.style.left = curTime * stepLeft + "px";
      divRef.current.style.top = curTime * stepTop + "px";
      if (curTime === time) {
        clearInterval(timer);
        timer = null;
      }
    }, duration);
    return stop; // 返回停止计时器的函数作为清理函数
  }); //RBT: useEffect没有设置第二个参数，每次组件重绘后，副作用函数都执行

  return (
    <div
      ref={divRef}
      style={{
        width: 100,
        height: 100,
        backgroundColor: "red",
        position: "fixed",
      }}
    ></div>
  );
}
export default function App() {
  const leftRef = React.createRef();
  const topRef = React.createRef();
  const [point, setPoint] = useState({ left: 0, top: 0 });
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {visible && (
        <p>
          <MovablePanel left={point.left} top={point.top} />
          <div
            style={{
              marginTop: 300,
            }}
          >
            <p>
              left:
              <input type="text" ref={leftRef} />
            </p>
            <p>
              top:
              <input type="text" ref={topRef} />
            </p>
          </div>
          <button
            onClick={() => {
              setPoint({
                left: leftRef.current.value,
                top: topRef.current.value,
              });
            }}
          >
            确定
          </button>
        </p>
      )}
      <p>
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          显示/隐藏
        </button>
      </p>
    </div>
  );
}
