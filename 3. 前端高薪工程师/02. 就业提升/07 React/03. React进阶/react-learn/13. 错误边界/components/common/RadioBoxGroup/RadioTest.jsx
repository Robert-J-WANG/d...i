import React, { Component } from "react";
import { getHeros } from "../../../service";
import RadioBoxGroup from ".";

export default class RadioTest extends Component {
  state = {
    datas: [],
    name: "loves",
    checkedValue: "",
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
    return <RadioBoxGroup {...this.state} handleChange={this.handleChange} />;
  }
}
