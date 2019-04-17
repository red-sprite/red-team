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
      aShips: [
        ["A1", "A2", "A3", "A4", "A5"],
        ["A10", "B10", "C10", "D10"],
        ["F7", "F8", "F9"],
        ["D4", "E4", "E5"],
        ["H4", "H5"]
      ],
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

  get = () => {
    axios;
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

  response(cPos) {
    let cRet = "M";
    var iShip = -1;
    var iPart = -1;
    var lGood = false;
    this.setState(prevState => {
      prevState.theirGuess.push(cPos);
    });
    this.state.aShips.forEach(function(aRow) {
      ++iShip;
      iPart = -1;
      lGood = false;
      aRow.forEach(function(cPart) {
        ++iPart;
        if (cPos === cPart) {
          cRet = "H";
          let newAShips = this.state.aShips;
          newAShips[iShip][iPart] = "X" + cPos;
          this.setState({ aShips: newAShips });
        } else if (this.state.aShips[iShip][iPart].substr(0, 1) !== "X") {
          lGood = true;
        }
      });
      if (cRet === "H" && !lGood) {
        cRet = "S";
      }
    });
    return cRet;
  }

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
