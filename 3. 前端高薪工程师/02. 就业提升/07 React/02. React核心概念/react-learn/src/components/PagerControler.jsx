import React, { Component } from "react";
import "./Pager.css";
// import Pager from "./ClassPager";
import Pager from "./FuncPager";
// import { getTopMovies } from "./topMovie.js";

export default class PagerControler extends Component {
  state = {
    currentPage: 10,
    lastPage: 100,
    pageNumber: 10,
  };
  handerClick = (targetPage) => {
    this.setState({ currentPage: targetPage });
  };
  render() {
    return <Pager {...this.state} handerClick={this.handerClick} />;
  }
}
