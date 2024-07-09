import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Home from "./pages/Home";
import ProtectRoute from "./components/ProtectRoute";

export default function App() {
  return (
    <Router>
      <div className="container">
        {/* 链接区*/}
        <ul>
          <li>
            <Link to="/login">登录</Link>
          </li>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/info">个人信息</Link>
          </li>
        </ul>

        {/* 内容区 */}
        <div className="box">
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectRoute path="/info" component={Info} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
