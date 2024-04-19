import React from "react";
import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";
import withDataGroup from "../../HOC/withDataGroup";

/**
 * 单个单选按钮表单
 */
class RadioBox extends React.Component {
  static propTypes = {
    info: types.infoData.isRequired,
    checkedValue: PropTypes.string,
    handlerChange: PropTypes.func,
    name: PropTypes.string.isRequired,
  };
  render() {
    const { info, name, checkedValue, handleChange } = this.props;
    return (
      <>
        <label>
          <input
            type="radio"
            name={name}
            value={info.value}
            checked={info.value === checkedValue}
            onChange={(e) => handleChange(e.target.value)}
          />
          {info.text}
        </label>
      </>
    );
  }
}

// 调用高阶组件withDataGroup创建表单group
const RadioBoxGroup = withDataGroup(RadioBox);
export default RadioBoxGroup;
