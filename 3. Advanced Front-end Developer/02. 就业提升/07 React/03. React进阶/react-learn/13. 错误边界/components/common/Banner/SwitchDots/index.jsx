import React, { Component } from "react";
import "./index.css";
import { PropTypes } from "prop-types";

export default class SwitchDots extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired, //小点的总数
    curIndex: PropTypes.number.isRequired, // 当前小点的索引
    onChange: PropTypes.func,
  };

  render() {
    let spans = [];
    for (let i = 0; i < this.props.total; i++) {
      spans.push(
        <span
          key={i}
          className={this.props.curIndex === i ? "active" : ""}
          onClick={() => this.props.onChange && this.props.onChange(i)}
        ></span>
      );
    }
    return <div className="dots">{spans}</div>;
  }
}
