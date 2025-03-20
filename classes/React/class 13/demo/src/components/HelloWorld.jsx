import React from "react";

class HelloWorld extends React.Component {
  // variables and methods

  render() {
    return <h1>Hello World, {this.props.name}</h1>;
  }
}

export default HelloWorld;
