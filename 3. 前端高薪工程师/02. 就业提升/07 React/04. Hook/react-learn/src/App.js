import React, { useState } from "react";

/* -------------- 1.函数有一个参数，这个参数的值表示状态的默认值 -------------- */
/* 
export default function App() {
  useState(0); // 新增一个状态，状态的默认值是0
  return <div>App</div>;
} 
*/

/* --------------- 2.函数的返回值是一个数组，该数组一定包含两项 -------------- */
//  - 第一项：当前状态的值
// - 第二项：改变状态的函数

/* 
export default function App() {
    const arr = useState(0); // 函数的返回值是一个数组
    const n = arr[0]; // 数组第一项：当前状态的值
    const setN = arr[1]; // 数组第二项：改变状态的函数
  
    //常见写法，数组解构
    const [n, setN] = useState(0); 
    return <div>App</div>;
  }   
*/

/* ---------- 3.一个函数组件中可以有多个状态，这种做法非常有利于横向切分关注点 --------- */
/* 
export default function App() {
    const [username, setUsername] = useState("James");
    const [password, setPassword] = useState("123456");
    return <div>App</div>;
  } 
*/

/* ---------------------- **注意的细节** --------------------- */

/* -----------------1. useState不能再函数组件外面使用 ---------------- */
// useState(0);
// Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
/* 
export default function App() {
  return <div>App</div>;
} 
*/

/* ----------------- 2.最好写到函数的起始位置，便于阅读 ----------------- */
/* ------------- 3.useState严禁出现在代码块（判断、循环）中 ------------- */
/* 
export default function App() {
    if (true) {
      const [username, setUsername] = useState("James");
    } else {
      const [username, setUsername] = useState("Peter");
    }
    return <div>App</div>;
  } 
*/

/* -------- 4.useState返回的函数（数组的第二项），引用不变（节约内存空间） -------- */

/* export default function App() {
  const [n, setN] = useState(0);
  let arr1 = [];
  return (
    <div>
      <p>{n}</p>
      <button
        onClick={() => {
          arr1.push(setN);
          console.log(arr1[0] === arr1[1]); // ture
        }}
      >
        点击2次
      </button>
    </div>
  );
} */

/* ------ 5.使用函数改变数据，若数据和之前的数据完全相等（使用Object.is比较）， ------ */
/* ----------------- 不会导致重新渲染，以达到优化效率的目的 ---------------- */

/* export default function App() {
    const [n, setN] = useState(0);
  
    console.log("render"); // 只渲染一次
    return (
      <div>
        <p>{n}</p>
        <button
          onClick={() => setN(0)} // 状态数据没有改变，不会导致重新渲染
        >
          点击
        </button>
      </div>
    );
  } */

/* --------- 6.使用函数改变数据，传入的值不会和原来的数据进行合并，而是直接替换 --------- */
/* export default function App() {
  const [info, setInfo] = useState({ name: "james", age: 18 });
  return (
    <div>
      <p>
        {info.name}:{info.age}
      </p>
      <button
        onClick={() => setInfo({ name: "peter" })} // 点击后之前替换，不会合并（保留age数据）
      >
        Change Info
      </button>
    </div>
  );
} */

/* -------------------- 7.如果要实现强制刷新组件 ------------------- */
// 1. 类组件：使用forceUpdate函数
// 2. 函数组件：使用一个空对象的useState

/* export default function App() {
  const [info, setInfo] = useState({ name: "james", age: 18 });
  const [, forceUpdate] = useState({}); // 使用一个空对象的useState
  console.log("app render");

  return (
    <div>
      <p>
        {info.name}:{info.age}
      </p>
      <button
        onClick={() => forceUpdate({})} // 点击强制刷新组件
      >
        Force Update
      </button>
    </div>
  );
} */

/* ------- 8.如果某些状态之间没有必然的联系，应该分化为不同的状态，而不要合并成一个对象 ------ */

/* -------- 9.和类组件的状态一样，函数组件中改变状态可能是异步的（在DOM事件中）， ------- */
/* ------------------- 多个状态变化会合并以提高效率， ------------------ */
/* ----------- 此时，不能信任之前的状态，而应该使用回调函数的方式改变状态。 ----------- */
/* --------------- 如果状态变化要使用到之前的状态，尽量传递函数。 -------------- */

export default function App() {
  const [n, setN] = useState(0);
  console.log("APP render");
  return (
    <div>
      <p>{n}</p>
      <button
        onClick={() => {
          //   setN(n + 1);
          //   setN(n + 1); // 状态不会立即改变，会等待事件完成之后一起改变
          //   setN(n + 1); // 所以此时的n还是0

          // 正确的做法是传递回调函数
          setN((n) => n + 1); // 回调函数会在事件完成后统一运行
          setN((n) => n + 1);
          setN((n) => n + 1);
        }}
      >
        n++
      </button>
    </div>
  );
}
