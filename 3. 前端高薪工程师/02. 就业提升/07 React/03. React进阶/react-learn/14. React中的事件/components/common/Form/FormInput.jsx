import React, { Component } from "react";
import formCtx from "./formContext";
import { PropTypes } from "prop-types";

export default class FormInput extends Component {
  // 获取context
  static contextType = formCtx;
  // 配置属性值类型
  static propsTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  // 设置属性默认值
  static defaultProps = {
    type: "text",
  };

  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        value={this.context.formData[this.props.name] || ""}
        onChange={(e) =>
          this.context.changeFormData(this.props.name, e.target.value)
        }
      />
    );
  }
}
