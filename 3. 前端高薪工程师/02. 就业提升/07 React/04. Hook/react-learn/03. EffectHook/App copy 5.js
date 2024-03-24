import React, { useEffect, useState } from "react";

function Test(props) {
  console.log("页面渲染了");
  const [, forceUpdate] = useState({});
  useEffect(() => {
    console.log("副作用函数执行");
    return () => {
      console.log("清理函数执行了");
    };
  }, []); //RBT: useEffect设置第二个参数为空数组，副作用函数只在组件挂载后执行一次，组件更新是不执行
  return (
    <div>
      <p>test</p>
      <button
        onClick={() => {
          forceUpdate({}); // 刷新组件，让组件重绘
        }}
      >
        刷新组件
      </button>
    </div>
  );
}
export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {visible && (
        <>
          <Test />
        </>
      )}
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        显示/隐藏
      </button>
    </div>
  );
}
