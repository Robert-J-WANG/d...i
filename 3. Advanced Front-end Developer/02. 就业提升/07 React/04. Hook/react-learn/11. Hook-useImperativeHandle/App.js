import React, { useImperativeHandle, useRef } from "react";

/* -------------------- 1.类式组件，使用ref -------------------- */
/* class Test extends React.Component {
  method() {
    console.log("this is a method");
  }
  render() {
    return <h1>this is the TEST component</h1>;
  }
}

export default function App() {
  const testRef = useRef();
  return (
    <div>
      <Test ref={testRef} />
      <button onClick={() => testRef.current.method()}> Click it</button>
    </div>
  );
} */

/* ------ 2.函数式组件，使用高阶组件和useImperativeHandle HOOK实现 ----- */

function Test(props, ref) {
  useImperativeHandle(
    ref,
    () => ({
      method: () => {
        console.log("this is a method");
      },
    }),
    []
  );
  return <h1>this is the TEST component</h1>;
}

export default function App() {
  // 使用高价组件实现ref转发
  const TextWrapper = React.forwardRef(Test);
  const testRef = useRef();
  return (
    <div>
      <TextWrapper ref={testRef} />
      <button onClick={() => testRef.current.method()}> Click it</button>
    </div>
  );
}
