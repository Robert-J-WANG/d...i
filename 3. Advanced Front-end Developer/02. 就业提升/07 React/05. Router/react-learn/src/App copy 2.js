import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import queryString from "query-string";

function A(props) {
  console.log(props.location);
  // {pathname: '/a', search: '', hash: '', state: undefined, key: 'ufu6zn'}
  const searchOjb = queryString.parse(props.location.search);
  const hashOjb = queryString.parse(props.location.hash);
  console.log(searchOjb, hashOjb);
  return (
    <div>
      <h1> 组件A</h1>
      <p>
        地址参数：a={searchOjb.a}, b={searchOjb.b}
      </p>
      <p>hash:{hashOjb.hello} </p>
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
        <Route component={C} />
      </Switch>
    </Router>
  );
}
