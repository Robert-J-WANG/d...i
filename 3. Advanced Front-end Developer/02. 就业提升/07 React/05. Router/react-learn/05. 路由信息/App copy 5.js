import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function News(props) {
  console.log(props.match);
  const { year, month, day } = props.match.params;
  return (
    <div>
      <h1> News</h1>
      <h2>
        显示：{year}年-{month}月-{day}日
      </h2>
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
        {/* path="/news/:year/:month/:day" 路径中包含params匹配规则 */}
        <Route
          path={["/news/:year/:month/:day", "/news/:year?", "/news/123"]}
          component={News}
        />
        <Route component={C} />
      </Switch>
    </Router>
  );
}
