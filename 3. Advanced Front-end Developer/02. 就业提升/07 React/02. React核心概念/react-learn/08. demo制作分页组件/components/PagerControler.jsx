import React, { Component } from "react";
import "./Pager.css";
// import Pager from "./ClassPager";
import Pager from "./FuncPager.jsx";
import { getTopMovies } from "./topMovie.js";
import MovieList from "./MovieList.jsx";

export default class PagerControler extends Component {
  state = {
    currentPage: 10,
    totalPage: 100,
    pageNumber: 10,
    movies: [],
  };

  constructor(props) {
    super(props);
    // 初始化页面，获取电影列表
    this.fetchMovieList(this.state.currentPage);
  }

  async fetchMovieList(page) {
    const resp = await getTopMovies(page);
    // console.log(resp);
    this.setState({ totalPage: resp.total_pages, movies: resp.results });
  }

  handerClick = (targetPage) => {
    console.log(targetPage);
    // setState()  在HTML元素的事件函数中调用时，是异步的，使用更新后的状态数据的话，采用回调函数的形式
    this.setState({ currentPage: targetPage }, () => {
      this.fetchMovieList(this.state.currentPage);
    });
    // 下面这样，得不到更新后的状态数据
    // this.setState({ currentPage: targetPage });
    // this.fetchMovieList(this.state.currentPage);
  };
  render() {
    return (
      <>
        <MovieList {...this.state} />
        <Pager {...this.state} handerClick={this.handerClick} />
      </>
    );
  }
}
