import React from "react";
import { A, B } from "./Comps";
import withLog from "./withLog";
import withLogin from "./withLogin";
let AComp = withLogin(withLog(A, "hello"));
let BComp = withLogin(withLog(B, "world"));
export default class App extends React.Component {
  render() {
    return (
      <div>
        <AComp isLogin a={1} />
        <BComp isLogin b={1} />
        <button
          onClick={() => {
            this.setState({});
          }}
        >
          点击
        </button>
      </div>
    );
  }
}
