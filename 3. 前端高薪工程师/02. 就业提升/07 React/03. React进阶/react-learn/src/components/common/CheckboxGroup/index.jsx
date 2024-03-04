import React from "react";
import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";

// 设置默认属性值
CheckboxGroup.defaulProps = {
  datas: [],
  checkedItems: [],
};
// 设置属性类型
CheckboxGroup.propTypes = {
  datas: types.groupDatas,
  checkedItems: types.chooseDatas,
  handlerChange: PropTypes.func,
  name: PropTypes.string,
};

/**
 * 
 * @param {*} props 
 *  1. datas, //[{value1,text1},{value2,text2}]
    2. checkedItems, // [value1,value2]
    3. handlerChange, // 处理change的回调
    4. name, // 单选框或多选框的类型
 * @returns 
 */

export default function CheckboxGroup(props) {
  const checkboxes = getCheckboxes(props);
  return (
    <div
      style={{
        outline: "1px solid blue",
        margin: "20px auto",
        padding: "50px",
      }}
    >
      {checkboxes}
    </div>
  );
}

/**
 *  根据传入的数据。生成一组多选框
 */
const getCheckboxes = (props) => {
  const {
    datas, //[{value1,text1},{value2,text2}]
    checkedItems, // [value1,value2]
    name, // 单选框或多选框的类型
  } = props;
  return datas.map((i) => (
    <label key={i.value}>
      <input
        type="checkbox"
        name={name}
        value={i.value}
        checked={checkedItems.includes(i.value)}
        onChange={(e) => onChange(props, e)}
      />
      {i.text}
    </label>
  ));
};

/**
 * 多选框勾选时，创建新的选中项目列表，经将新的列表传递给使用者
 */
const onChange = (props, e) => {
  console.log(props);
  const {
    checkedItems, // [value1,value2]
    handlerChange, // 处理change的回调
    name, // 单选框或多选框的类型
  } = props;
  let newCheckedItems;

  if (name === "loves") {
    const value = e.target.value;
    if (checkedItems.includes(value)) {
      newCheckedItems = checkedItems.filter((i) => i !== value);
    } else {
      newCheckedItems = [...checkedItems, value];
    }
    handlerChange(newCheckedItems);
  }
};
