import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as Pages from "./pages/Pages";
import TransitionRoute from "./components/TransitionRoute";
import "./App.css";

export default function App() {
  return (
    <Router
      getUserConfirmation={(msg, callback) => {
        callback(window.confirm(msg));
      }}
    >
      <Pages.NavBar />
      <div className="page-container">
        <TransitionRoute path="/" exact component={Pages.HomePage} />
        <TransitionRoute path="/news" exact component={Pages.NewsPage} />
      </div>
    </Router>
  );
}
