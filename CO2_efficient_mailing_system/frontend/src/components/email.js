import React, { Component } from "react";
import "../static/inbox.css";
import "../static/font-awesome/css/font-awesome.min.css";

class Email extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: props.sender,
    };
  }

  render() {
    return (
      <tr className="sui-row" role="row">
        <td
          style={{ textAlign: "center" }}
          role="gridcell"
          tabindex="-1"
          className="sui-cell"
        >
          <input type="checkbox" />
        </td>
        <td
          style={{ textAlign: "center" }}
          role="gridcell"
          tabindex="-1"
          className="sui-cell"
        >
          <span className="fa fa-envelope"></span>
        </td>
        <td role="gridcell" tabindex="-1" className="sui-cell">
          {this.state.sender}
        </td>
      </tr>
    );
  }
}

export default Email;
