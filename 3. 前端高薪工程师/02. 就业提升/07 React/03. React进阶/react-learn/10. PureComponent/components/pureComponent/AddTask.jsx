import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

export default class AddTask extends PureComponent {
  state = {
    task: "",
  };
  static propTypes = {
    addTask: PropTypes.func,
  };
  render() {
    console.log("AddTask rendered");
    return (
      <>
        <input
          type="text"
          value={this.state.task}
          onChange={(e) => {
            this.setState({ task: e.target.value });
          }}
        />
        <button
          onClick={(e) =>
            this.props.addTask && this.props.addTask(this.state.task)
          }
        >
          add Task
        </button>
      </>
    );
  }
}
