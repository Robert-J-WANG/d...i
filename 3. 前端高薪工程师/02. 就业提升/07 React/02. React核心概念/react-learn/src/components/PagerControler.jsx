import React, { Component } from "react";
import "./Pager.css";
// import Pager from "./ClassPager";
import Pager from "./FuncPager";
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

  handerClick = async (targetPage) => {
    // setState()是异步的，这里等待操作完成，在调用fetchMovieList方法
    await this.setState({ currentPage: targetPage });
    this.fetchMovieList(this.state.currentPage);
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
