import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import "./Task.css";

export default class Task extends PureComponent {
  static propTypes = {
    task: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  };
  render() {
    console.log("Task rendered");
    return (
      <li className={this.props.isDone ? "done" : ""}>{this.props.task}</li>
    );
  }
}
