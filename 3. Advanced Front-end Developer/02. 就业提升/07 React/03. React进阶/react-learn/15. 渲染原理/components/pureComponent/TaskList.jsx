import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import Task from "./Task";

export default class TaskList extends PureComponent {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        task: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired,
      })
    ).isRequired,
  };
  render() {
    console.log("TaskList rendered");
    const tasks = this.props.tasks.map((t, i) => <Task key={i} {...t} />);
    return <ul>{tasks}</ul>;
  }
}
