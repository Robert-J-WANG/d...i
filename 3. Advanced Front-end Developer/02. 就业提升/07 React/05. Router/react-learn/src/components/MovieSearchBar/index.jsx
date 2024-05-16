import React, { Component } from "react";
import "./index.css";

export default class MovieSearchBar extends Component {
  // state = {
  //   query: "",
  //   langage: "en-US",
  //   region: "",
  // };
  constructor(props) {
    super(props);
    const defaultState = {
      query: "",
      langage: "en-US",
      region: "",
    };
    // 混合一下状态：如果没有传递过来的props里的defaultValue，则使用defaultState，否则，将传递过来的defaultValue与defaultState混合，结果设置为初始状态值
    // 这样就可以在使用MovieSearchBar组件时，设置默认属性了
    this.state = Object.assign({}, defaultState, props.defaultValue);
  }
  handleSearch = () => {
    // 抛出事件
    if (this.props.onSearch) {
      this.props.onSearch(this.state);
    }
  };

  render() {
    return (
      <div className="searchBar">
        <h2 className="searchTitle">Search Movies</h2>
        <div className="searchForm">
          <span>
            Keywords:{" "}
            <input
              type="text"
              value={this.state.query}
              onChange={(e) => {
                this.setState({ ...this.state, query: e.target.value });
              }}
            />
          </span>
          <span>
            Language(such as "en-US"):{" "}
            <input
              type="text"
              value={this.state.langage}
              onChange={(e) => {
                this.setState({ ...this.state, langage: e.target.value });
              }}
            />
          </span>
          <span>
            Region(such as "US" ):{" "}
            <input
              type="text"
              value={this.state.region}
              onChange={(e) => {
                this.setState({ ...this.state, region: e.target.value });
              }}
            />
          </span>
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}
