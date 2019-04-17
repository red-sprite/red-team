import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./grid/Grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid1Data: {}
    };
  }

  render() {
    return (
      <div className="App" style={{ display: "flex" }}>
        <Grid colour="red" data={this.state.grid1Data} />
        <Grid colour="blue" />
      </div>
    );
  }
}

export default App;
