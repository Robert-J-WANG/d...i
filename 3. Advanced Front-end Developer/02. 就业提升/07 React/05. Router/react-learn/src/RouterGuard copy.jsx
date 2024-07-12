import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RouterGuard extends Component {
  componentDidMount() {
    /* ---------------------- 1. 使用监听器 ---------------------- */
    // 当前的location对象就是监听地址路径变化之前的
    const prevLocation = this.props.history.location;
    this.unListen = this.props.history.listen((location, action) => {
      // 监听之后的location就是地址路径变化后新的
      // console.log("地址变化了！！");
      // console.log(location);
      // console.log(action);
      if (this.props.onChange) {
        // 将取消监听的权限交个使用者
        this.props.onChange(prevLocation, location, action, this.unListen);
      }
    });

    /* ---------------------- 2. 设置一个阻塞 --------------------- */
    this.props.history.block("真的要跳转页面吗？");
  }
  // 组件卸载时取消监听
  componentWillUnmount() {
    this.unListen();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(RouterGuard);
