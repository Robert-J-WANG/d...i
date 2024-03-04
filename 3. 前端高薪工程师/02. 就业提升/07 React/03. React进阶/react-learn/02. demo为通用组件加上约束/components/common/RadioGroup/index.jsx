import React from "react";
import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";

// 设置默认属性值
RadioGroup.defaulProps = {
  datas: [],
  checkedValue: "",
};
// 设置属性类型
RadioGroup.propTypes = {
  datas: types.groupDatas,
  checkedValue: PropTypes.string,
  handlerChange: PropTypes.func,
  name: PropTypes.string,
};

/**
 *
 * @param {*} props
 *  1. datas, //[{value1,text1},{value2,text2}]
    2. checkedValue, "value1"
    3. handlerChange, // 处理change的回调
    4. name, // 单选框或多选框的类型
 * @returns
 */
export default function RadioGroup(props) {
  const radioGroup = getRadioGroup(props);
  return (
    <div
      style={{ outline: "1px solid red", margin: "20px auto", padding: "50px" }}
    >
      {radioGroup}
    </div>
  );
}

function getRadioGroup(props) {
  const { datas, checkedValue, name } = props;
  return datas.map((i) => (
    <label key={i.value}>
      <input
        type="radio"
        name={name}
        value={i.value}
        checked={i.value === checkedValue}
        onChange={(e) => onChange(e, props)}
      />
      {i.text}
    </label>
  ));
}
function onChange(e, props) {
  const { handleChange } = props;
  const value = e.target.value;
  handleChange(value);
}
