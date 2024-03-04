import React, { Component } from "react";
import RadioGroup from ".";
import { getHeros } from "../../../service";

export default class RadioTest extends Component {
  state = {
    datas: [
      { value: "value1", text: "text1" },
      { value: "value2", text: "fs-2" },
    ],
    name: "loves",
    checkedValue: "value1",
  };

  handleChange = (value) => {
    this.setState({ checkedValue: value });
  };
  async componentDidMount() {
    const heros = await getHeros();
    const datas = heros.map((h) => ({
      value: h.id_name,
      text: h.cname,
    }));
    this.setState({ datas: datas });
  }

  render() {
    return <RadioGroup {...this.state} handleChange={this.handleChange} />;
  }
}
