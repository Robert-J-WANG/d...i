import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class index extends Component {
  static propTypes = {
    header: PropTypes.element, // 头部区显示的内容
    aside: PropTypes.element, // 左侧栏显示的内容
    children: PropTypes.element, // 右侧内容栏显示的内容
  };
  render() {
    console.log(this.props.header);
    return (
      <div className="container">
        {/* 头部区 */}
        <header className="header">{this.props.header}</header>
        {/* 中间区域 */}
        <div className="middle">
          {/* 左侧栏 */}
          <aside className="aside">{this.props.aside}</aside>
          {/* 右侧内容栏 */}
          <main className="main">{this.props.children}</main>
        </div>
      </div>
    );
  }
}
