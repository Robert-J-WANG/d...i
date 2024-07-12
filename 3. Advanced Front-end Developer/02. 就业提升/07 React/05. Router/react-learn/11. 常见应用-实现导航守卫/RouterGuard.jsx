import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

let prevLocation, location, action, unblock;

class _HelpRouter extends Component {
  componentDidMount() {
    /* ---------------------- 1. 设置一个阻塞 --------------------- */
    unblock = this.props.history.block((loc, ac) => {
      prevLocation = this.props.location;
      location = loc;
      action = ac;
      return "真的要跳转页面吗？";
    });

    /* ---------------------- 2. 添加监听器 ---------------------- */
    // 当前的location对象就是监听地址路径变化之前的
    this.unListen = this.props.history.listen((location, action) => {
      if (this.props.onChange) {
        // 将取消监听的权限交个使用者
        this.props.onChange(prevLocation, location, action, this.unListen);
      }
    });
  }
  // 组件卸载
  componentWillUnmount() {
    // 取消阻塞
    unblock();
    // 取消监听器
    this.unListen();
  }
  render() {
    return null;
  }
}
const HelpRouter = withRouter(_HelpRouter);

class RouterGuard extends Component {
  handleChange = (callback) => {
    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(
        prevLocation,
        location,
        action,
        callback,
        unblock
      );
    } else {
      callback(true);
    }
  };
  componentDidMount() {}
  render() {
    return (
      <Router
        getUserConfirmation={(msg, callback) => {
          this.handleChange(callback);
        }}
      >
        <HelpRouter onChange={this.props.onChange} />
        {this.props.children}
      </Router>
    );
  }
}

export default RouterGuard;
