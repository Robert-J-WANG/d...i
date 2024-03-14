import React, { Component, PureComponent } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

export default class TaskContainer extends PureComponent {
  state = {
    tasks: [],
  };
  componentDidMount() {
    let newTasks = [];
    for (let i = 1; i <= 10; i++) {
      newTasks.push({ task: `task${i}`, isDone: Math.random() > 0.5 });
    }
    this.setState({ tasks: newTasks });
  }
  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, { task: task, isDone: false }],
    });
  };
  render() {
    console.log("TaskContainer rendered");
    return (
      <>
        <TaskList {...this.state} />
        <AddTask addTask={this.addTask} />
      </>
    );
  }
}
