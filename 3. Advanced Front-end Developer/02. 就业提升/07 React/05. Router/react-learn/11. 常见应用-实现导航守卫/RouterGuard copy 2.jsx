import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

class _HelpRouter extends Component {
  componentDidMount() {
    /* ---------------------- 设置一个阻塞 --------------------- */
    this.props.history.block("真的要跳转页面吗？");
  }
  render() {
    return null;
  }
}
const HelpRouter = withRouter(_HelpRouter);

class RouterGuard extends Component {
  handleChange = (callback) => {
    this.props.onBeforeChange && this.props.onBeforeChange(callback);
  };
  render() {
    return (
      <Router
        getUserConfirmation={(msg, callback) => {
          this.handleChange(callback);
        }}
      >
        <HelpRouter />
        {this.props.children}
      </Router>
    );
  }
}

export default RouterGuard;
