import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./grid/Grid";

const baseURL = "http://192.168.8.101:3300/rsbs/v1";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ourships: {
        c: [
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          }
        ],
        b: [
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          }
        ],
        d: [
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          }
        ],
        s: [
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          }
        ],
        p: [
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          },
          {
            position: "",
            isHit: ""
          }
        ]
      },
      guesses: [],
      grid1Data: {
        ships: {
          c: {},
          b: {},
          d: {},
          s: {},
          p: {}
        }
      },

      gridData: [
        [0, 1, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],

      theirGrid: {
        A: ["", "", "", "", "", "", "", "", "", ""],
        B: ["", "", "", "", "", "", "", "", "", ""],
        C: ["", "", "", "", "", "", "", "", "", ""],
        D: ["", "", "", "", "", "", "", "", "", ""],
        E: ["", "", "", "", "", "", "", "", "", ""],
        F: ["", "", "", "", "", "", "", "", "", ""],
        G: ["", "", "", "", "", "", "", "", "", ""],
        H: ["", "", "", "", "", "", "", "", "", ""],
        I: ["", "", "", "", "", "", "", "", "", ""],
        J: ["", "", "", "", "", "", "", "", "", ""]
      }
    };
  }

  post = () => {
    axios
      .post(baseURL + "/target/", { cell: "A3" })
      .then(result => {
        console.log({ result });
      })
      .catch(error => {
        console.log({ error });
      });
  };

  makeGuess = () => {
    var coords = this.getGuess();

    var guessString = coords[0] + coords[1];
    // Call the server and get it's response

    var result = "";

    this.theirGrid[coords[0]][coords[1] - 1] = result;
  };

  getGuess = () => {
    var xCoords = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var yCoords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var guess;

    do {
      var x = xCoords[Math.floor(Math.random() * xCoords.length)];
      var y = yCoords[Math.floor(Math.random() * yCoords.length)];

      guess = x + y;
    } while (this.guesses.indexOf(guess) === -1);

    this.setState(prevState => {
      prevState.guesses.push(guess);
    });

    return [x, y];
  };

  render() {
    return (
      <div className="App">
        <button
          style={{
            marginTop: "50px",
            width: "300px",
            height: "80px",
            backgroundColour: "green",
            borderRadius: "25px"
          }}
          onClick={() => this.post()}
        >
          GO!
        </button>
        <div
          style={{ display: "flex", width: "100vw", justifyContent: "center" }}
        >
          <Grid colour="red" data={this.state.gridData} />
          <Grid colour="blue" data={this.state.gridData} />
        </div>
      </div>
    );
  }
}

export default App;
