import React, { Component } from "react";
import SelectGroup from ".";
import { getHeros } from "../../../service";

export default class SelectTest extends Component {
  state = {
    datas: [
      // { value: "value1", text: "text1" },
      // { value: "value2", text: "fs-2" },
    ],
    name: "loves",
    selectedValue: "",
  };
  handleChange = (value) => {
    this.setState({ selectedValue: value });
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
    return (
      <div>
        <SelectGroup {...this.state} handleChange={this.handleChange} />
      </div>
    );
  }
}
