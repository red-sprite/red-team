import React from "react";

class Grid extends React.Component {
  render() {
    return (
      <tbody>
        {Array(10).fill(
          <tr>
            {Array(10).fill(
              <td
                style={{
                  border: `2px solid ${this.props.colour}`,
                  width: "50px",
                  height: "50px"
                }}
              >
                <div />
              </td>
            )}
          </tr>
        )}
      </tbody>
    );
  }
}
Grid.propTypes = {};
export default Grid;
