import React from "react";
import fire from "../assets/fire.svg";
import splash from "../assets/splash.svg";

class Grid extends React.Component {
  render() {
    return (
      <tbody style={{ margin: "50px" }}>
        {this.props.data.map(row => {
          return (
            <tr>
              {row.map(column => {
                return (
                  <td
                    style={{
                      border: `2px solid ${this.props.colour}`,
                      width: "50px",
                      height: "50px"
                    }}
                  >
                    {column !== 0 && (
                      <img
                        src={column === 1 ? fire : splash}
                        style={{ width: "40px" }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}
Grid.propTypes = {};
export default Grid;
