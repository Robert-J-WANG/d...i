import React, { Component } from "react";
import CheckboxGroup from ".";
import { getHeros } from "../../Service";

export default class Test extends Component {
  state = {
    datas: [
      // { value: "value1", text: "text1" },
      // { value: "value2", text: "fs-2" },
    ],
    name: "loves",
    checkedItems: [
      // "value1", "value2"
    ],
  };
  handlerChange = (newCheckedItems) => {
    this.setState({ checkedItems: newCheckedItems });
  };
  async componentDidMount() {
    const heros = await getHeros();
    const datas = heros.map((h) => ({ value: h.id_name, text: h.cname }));
    this.setState({ datas: datas });
  }
  render() {
    if (this.state.datas.length <= 0) {
      return <p>loading...</p>;
    }
    return (
      <>
        <CheckboxGroup {...this.state} handlerChange={this.handlerChange} />
      </>
    );
  }
}
