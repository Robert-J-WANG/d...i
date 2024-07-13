import React from "react";
import * as Pages from "./Pages";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="main">
      <Router>
        <Pages.NavBar></Pages.NavBar>
        <div className="page-container">
          <Route path="/" exact component={Pages.Home} />
          <Route path="/news" exact component={Pages.News} />
          <Route path="/personal" exact component={Pages.Personal} />
        </div>
      </Router>
    </div>
  );
}
