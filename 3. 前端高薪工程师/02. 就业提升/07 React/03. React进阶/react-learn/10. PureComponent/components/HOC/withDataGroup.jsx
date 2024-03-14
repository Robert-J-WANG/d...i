import React from "react";
import types from "../../utils/commonTypes";

/**
 * 实现根据数据渲染出的一组表单组件
 * @param {*} Comp 什么类型的表单
 * @returns  一组和数据相关的表单
 */
export default function withDataGroup(Comp) {
  return class DataWrapper extends React.Component {
    static defaultProps = {
      datas: [],
    };
    static propTypes = {
      datas: types.groupDatas,
    };
    render() {
      const comps = this.props.datas.map((data, index) => (
        <Comp key={index} info={data} {...this.props} />
      ));
      return <>{comps}</>;
    }
  };
}
