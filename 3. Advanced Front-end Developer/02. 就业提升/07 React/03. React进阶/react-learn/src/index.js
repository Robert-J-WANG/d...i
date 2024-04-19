import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

/* -------------------- 1. React元素节点 -------------------- */
/* 
const app = (
  <div>
    <h1>hello world</h1>
  </div>
);
ReactDOM.render(app, document.getElementById("root")); 
*/

/* -------------------- 2. React组件节点 -------------------- */
/* 
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>hello world</h1>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root")); 
*/

/* --------------------- 3.React文本节点 -------------------- */
/* 
const app = "hello world";
ReactDOM.render(app, document.getElementById("root"));
*/

/* --------------------- 4.React空节点 --------------------- */
/* 
const app = null; // undefined, false,NaN
ReactDOM.render(app, document.getElementById("root")); 
*/

/* --------------------- 5.React数组节点 --------------------- */
/* 
const app = [1, 2, 3, 4]; // 会一次渲染数组的元素
ReactDOM.render(app, document.getElementById("root")); 
*/
