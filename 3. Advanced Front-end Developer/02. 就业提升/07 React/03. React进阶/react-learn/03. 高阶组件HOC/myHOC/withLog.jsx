import React from "react";

/**
 * 只专注打印日志相关的功能
 * @param {*} Comp
 * @returns
 */
export default function withTest(Comp) {
  return class TestWrapper extends React.Component {
    componentDidMount() {
      console.log(`日志：组件${Comp.name}被创建了！${Date.now()}`);
    }
    componentWillUnmount() {
      console.log(`日志：组件${Comp.name}被销毁了！${Date.now()}`);
    }
    render() {
      return (
        <>
          <Comp {...this.props} />
        </>
      );
    }
  };
}
