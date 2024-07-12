import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import RouterGuard from "./RouterGuard";

function Page1() {
  return <div>Page1</div>;
}

function Page2() {
  return <div>Page2</div>;
}

export default function App() {
  return (
    <RouterGuard
      onBeforeChange={(callback) => {
        console.log(`想要跳转页面`);
        callback(true);
      }}
    >
      <div className="container">
        <ul>
          <li>
            <Link to="/page1">Page1</Link>
          </li>
          <li>
            <Link to="/page2">Page2</Link>
          </li>
        </ul>

        <div className="box">
          <Switch>
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
          </Switch>
        </div>
      </div>
    </RouterGuard>
  );
}
