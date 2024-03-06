import React from "react";
import TestMyHOC from "./myHOC/TestMyHOC";
import TestHOC from "./HOC/TestHOC";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TestMyHOC />
        <hr />
        <TestHOC />
      </div>
    );
  }
}
