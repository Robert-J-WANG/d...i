import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

const AWraper = withRouter(A);

function News(props) {
  return (
    <div>
      <h1> News</h1>
      {/* 方法1：逐层传递props */}
      {/* <A {...props} /> */}
      {/* 方法2：使用react-router提供的高阶组件withRouter包装 */}
      <AWraper />
    </div>
  );
}
function A(props) {
  return (
    <div>
      <h3>Component A</h3>
      <button onClick={() => props.history.push("/")}>点击返回</button>
    </div>
  );
}

function C() {
  return <h1> Not Found</h1>;
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/news" component={News} />
        <Route component={C} />
      </Switch>
    </Router>
  );
}
