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
      onBeforeChange={(prevLoc, curLoc, action, callback, unblock) => {
        console.log(
          `阻塞器日志：想要跳转页面: 从页面${prevLoc.pathname}跳转到${curLoc.pathname},跳转方式是${action} `
        );
        callback(true);
        unblock(); //取消阻塞，仅阻塞一次
      }}
      onChange={(prevLocation, locaction, action, unListen) => {
        console.log(
          `监听器日志：路径变化了，路径从${prevLocation.pathname}跳转到${locaction.pathname}, 跳转的类型是:${action}`
        );
        unListen(); //取消监听，仅监听一次
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
