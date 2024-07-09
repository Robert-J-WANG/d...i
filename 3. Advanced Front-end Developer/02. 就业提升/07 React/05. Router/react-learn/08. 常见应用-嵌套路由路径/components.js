import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import route from "./configRouteWithComp.js";

export function Home() {
  return <div>Home Page</div>;
}

export function About() {
  return <div>About Page</div>;
}

export function UserLogin() {
  return <div>UserLogin Page</div>;
}

export function UserAdd() {
  return <div>UserAdd Page</div>;
}

export function User() {
  const { login, add } = route.user;
  return (
    <div>
      <h1>User Page</h1>
      <div className="content">
        <div className="left box">
          <Link to={login.path}>Login</Link>
          <Link to={add.path}>Add</Link>
        </div>
        <div className="right box">
          <Switch>
            <Route path={login.path} component={login.component} />
            <Route path={add.path} component={add.component} />
            <Redirect to={login.path} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
