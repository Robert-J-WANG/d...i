import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function A(props) {
  return (
    <div>
      <h1> 组件A</h1>
      <button onClick={() => props.history.push("/b")}>跳转到组件B</button>
    </div>
  );
}
function B(props) {
  return (
    <div>
      <h1> 组件B</h1>
      <button onClick={() => props.history.push("/a")}>跳转到组件A</button>
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
        <Route path="/a" component={A} />
        <Route path="/b" component={B} />
        <Route component={C} />
      </Switch>
    </Router>
  );
}
