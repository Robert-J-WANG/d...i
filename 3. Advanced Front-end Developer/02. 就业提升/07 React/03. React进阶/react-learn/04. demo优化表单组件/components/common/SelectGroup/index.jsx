import React from "react";

import types from "../../../utils/commonTypes";
import { PropTypes } from "prop-types";
import withDataGroup from "../../HOC/withDataGroup";

class Option extends React.Component {
  static propTypes = {
    info: types.infoData.isRequired,
  };

  render() {
    const { info } = this.props;
    return (
      <>
        <option value={info.value}>{info.text}</option>
      </>
    );
  }
}
const OptionGroup = withDataGroup(Option);
export default class SelectGroup extends React.Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    handleChange: PropTypes.func,
    name: PropTypes.string,
  };
  render() {
    const { name, selectedValue, handleChange } = this.props;
    return (
      <select
        name={name}
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        <OptionGroup {...this.props}></OptionGroup>
      </select>
    );
  }
}
