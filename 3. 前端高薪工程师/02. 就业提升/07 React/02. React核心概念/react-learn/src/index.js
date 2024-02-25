import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Heroes from "./component/Heroes";

async function getHeroes() {
  const resp = await axios.get("https://study.duyiedu.com/api/herolist");
  return resp.data.data;
}

async function render() {
  ReactDOM.render(<h1>loading...</h1>, document.getElementById("root"));
  const heroes = await getHeroes();
  ReactDOM.render(<Heroes heroes={heroes} />, document.getElementById("root"));
}
render();
