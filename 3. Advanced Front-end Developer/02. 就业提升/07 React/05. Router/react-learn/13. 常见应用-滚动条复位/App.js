import React from "react";
import * as Pages from "./pages/Pages";
import "./App.css";
import TransitionRoute from "./components/TransitionRoute";
import RouterGuard from "./components/RouterGuard";
import setScroll from "./components/setScroll";

export default function App() {
  return (
    <RouterGuard
      onChange={(prevLocation, location) => {
        if (prevLocation !== location) {
          setScroll();
        }
      }}
    >
      <Pages.NavBar />
      <div className="page-container">
        <TransitionRoute path="/" exact component={Pages.Home} />
        <TransitionRoute path="/news" exact component={Pages.News} />
      </div>
    </RouterGuard>
  );
}
