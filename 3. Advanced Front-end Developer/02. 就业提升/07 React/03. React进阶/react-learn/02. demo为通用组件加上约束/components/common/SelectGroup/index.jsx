import React from "react";

import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";

// 设置默认属性值
SelectGroup.defaulProps = {
  datas: [],
  selectedValue: "",
};
// 设置属性类型
SelectGroup.propTypes = {
  datas: types.groupDatas,
  selectedValue: PropTypes.string,
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
export default function SelectGroup(props) {
  const { name, selectedValue } = props;
  const selectGroup = getSelectGroup(props);
  return (
    <div>
      <select
        style={{
          width: "100%",
          height: "100%",
          margin: "20px auto",
          padding: "10px 50px",
        }}
        name={name}
        value={selectedValue}
        onChange={(e) => onChange(e, props)}
      >
        {selectGroup}
      </select>
    </div>
  );
}

function getSelectGroup(props) {
  const { datas } = props;
  return datas.map((i) => (
    <option key={i.value} value={i.value}>
      {i.text}
    </option>
  ));
}

function onChange(e, props) {
  const value = e.target.value;
  // console.log(value, props);
  props.handleChange(value);
}
