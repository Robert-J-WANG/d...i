import React, { Component } from "react";
import Hero from "./Hero";

export default class Heroes extends Component {
  render() {
    const heroes = this.props.heroes;
    return (
      <ul>
        {heroes.map((hero, index) => (
          <Hero hero={hero} key={index} />
        ))}
      </ul>
    );
  }
}
