import React from "react";
import * as Pages from "./pages/Pages";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import TransitionRoute from "./components/TransitionRoute";

export default function App() {
  return (
    <Router>
      <Pages.NavBar />
      <div className="page-container">
        <TransitionRoute path="/" exact component={Pages.HomePage} />
        <TransitionRoute path="/news" exact component={Pages.NewsPage} />
      </div>
    </Router>
  );
}
