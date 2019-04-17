import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./grid/Grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid1Data: {
        ourships: {
          c: [
              {
                position: '',
                isHit: ''
              },
              {
                position: '',
                isHit: ''
              },              {
                position: '',
                isHit: ''
              },              {
                position: '',
                isHit: ''
              },              {
                position: '',
                isHit: ''
              }
            ],
            b: [
              {
                position: '',
                isHit: ''
              },
              {
                position: '',
                isHit: ''
              },              
              {
                position: '',
                isHit: ''
              },                        
              {
                position: '',
                isHit: ''
              }
            ],
            d: [
              {
                position: '',
                isHit: ''
              },
              {
                position: '',
                isHit: ''
              },                                    
              {
                position: '',
                isHit: ''
              }
            ],
            s: [
              {
                position: '',
                isHit: ''
              },
              {
                position: '',
                isHit: ''
              },                                    
              {
                position: '',
                isHit: ''
              }
            ],
            p: [
              {
                position: '',
                isHit: ''
              },
              {
                position: '',
                isHit: ''
              },                                    
              {
                position: '',
                isHit: ''
              }
            ]
        },
      }
    };
  }

  post = () => {
    const params = {};
    axios
      .post("/", params)
      .then(result => {
        console.log({ result });
      })
      .catch(error => {
        console.log({ error });
      });
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
        >
          GO!
        </button>
        <div
          style={{ display: "flex", width: "100vw", justifyContent: "center" }}
        >
          <Grid colour="red" data={this.state.grid1Data} />
          <Grid colour="blue" />
        </div>
      </div>
    );
  }
}

export default App;
