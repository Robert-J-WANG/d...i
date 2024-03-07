import React from "react";
import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";
import withDataGroup from "../../HOC/withDataGroup";

class Checkbox extends React.Component {
  static propTypes = {
    info: types.infoData.isRequired,
    checkedItems: types.chooseDatas,
    handlerChange: PropTypes.func,
    name: PropTypes.string.isRequired,
  };

  onChange = (e) => {
    const {
      checkedItems, // [value1,value2]
      handlerChange, // 处理change的回调
    } = this.props;
    let newCheckedItems;

    const value = e.target.value;
    if (checkedItems.includes(value)) {
      newCheckedItems = checkedItems.filter((i) => i !== value);
    } else {
      newCheckedItems = [...checkedItems, value];
    }
    handlerChange(newCheckedItems);
  };
  render() {
    const { info, name, checkedItems } = this.props;
    return (
      <>
        <label>
          <input
            type="checkbox"
            name={name}
            value={info.value}
            checked={checkedItems.includes(info.value)}
            onChange={(e) => this.onChange(e)}
          />
          {info.text}
        </label>
      </>
    );
  }
}
const CheckboxGroup = withDataGroup(Checkbox);
export default CheckboxGroup;
