import React, { Component } from "react";
import Form from ".";

export default class FormTest extends Component {
  render() {
    return (
      <>
        <Form onSubmit={(datas) => console.log(datas)}>
          <div>
            <span>userName:</span>
            <Form.Input type="text" name="username" />
          </div>
          <div>
            <span>passWord:</span>
            <Form.Input type="password" name="password" />
          </div>
          <div>
            <Form.Button>SUBMIT</Form.Button>
          </div>
        </Form>
      </>
    );
  }
}
