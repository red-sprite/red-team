import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./grid/Grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid1Data: {
        ships: {
          c: {},
          b: {},
          d: {},
          s: {},
          p: {}
        }
      }
    };
  }

  render() {
    return (
      <div className="App" style={{}}>
        <Grid colour="red" data={this.state.grid1Data} />
        <Grid colour="blue" />
      </div>
    );
  }
}

export default App;
