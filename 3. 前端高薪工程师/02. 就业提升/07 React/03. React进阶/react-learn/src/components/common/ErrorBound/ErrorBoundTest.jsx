import React, { Component } from "react";
import ErrorBound from ".";

function Comp1() {
  return (
    <div
      style={{
        width: "50%",
        height: 300,
        border: "2px solid",
      }}
    >
      <h1>Comp1</h1>
      <Comp2 />
    </div>
  );
}

function Comp2() {
  return (
    <div
      style={{
        width: "40%",
        height: "40%",
        border: "2px solid",
      }}
    >
      <h1
        onClick={() => {
          throw new Error("点击时发生的错误");
        }}
      >
        Comp2
      </h1>
    </div>
  );
}

function Comp3() {
  return (
    <div
      style={{
        width: "50%",
        height: 200,
        border: "2px solid",
      }}
    >
      <h1>Comp3</h1>
    </div>
  );
}

export default class ErrorBoundTest extends Component {
  render() {
    return (
      <div>
        <ErrorBound>
          <Comp1 />
        </ErrorBound>
        <Comp3 />
      </div>
    );
  }
}
