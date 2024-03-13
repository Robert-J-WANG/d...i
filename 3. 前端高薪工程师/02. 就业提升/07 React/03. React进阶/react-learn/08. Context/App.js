import React from "react";
// import OldContext from "./OldContext";
// import NewContext from "./NewContext";
import MyNewContext from "./MyNewContext";
export default class App extends React.Component {
  render() {
    return (
      <>
        {/* <OldContext /> */}
        {/* <NewContext /> */}
        <MyNewContext />
      </>
    );
  }
}
