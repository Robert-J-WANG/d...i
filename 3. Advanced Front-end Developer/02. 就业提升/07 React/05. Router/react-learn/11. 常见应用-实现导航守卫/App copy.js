import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RouterGuard from "./RouterGuard";

function Page1() {
  return <div>Page1</div>;
}

function Page2() {
  return <div>Page2</div>;
}

let count = 0;

export default function App() {
  return (
    <Router
      getUserConfirmation={(msg, callback) => {
        console.log(`想要跳转页面，没门！阻塞消息是：${msg}`);
        // 设置true - 可以调转
        callback(true);
        // 默认或者设置false - 不可以跳转
        callback(false);
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
        <RouterGuard
          onChange={(prevLocation, locaction, action, unListen) => {
            count++;
            console.log(
              `count:${count},日志：路径变化了，路径从${prevLocation.pathname}跳转到${locaction.pathname}, 跳转的类型是:${action}`
            );
            if (count >= 5) {
              console.log(`count:${count},日志：监听即将被取消`);
              unListen();
            }
          }}
        >
          <div className="box">
            <Switch>
              <Route path="/page1" component={Page1} />
              <Route path="/page2" component={Page2} />
            </Switch>
          </div>
        </RouterGuard>
      </div>
    </Router>
  );
}
