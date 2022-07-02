import { result } from "lodash";
import React, { Component } from "react";

class BaxBar extends Component {
  render() {
    return (
      <div className="bar-state">
        <div className="stepw active">
          <div className="bulletrr">1</div>
          <div className="bar-butiit"></div>
        </div>

        <div className={`stepw ${this.props.bar > 2 ? "active" : ""}`}>
          <div className="bulletrr">2</div>
          <div className="bar-butiit"></div>
        </div>
        <div className={`stepw ${this.props.bar > 4 ? "active" : ""}`}>
          <div className="bulletrr">3</div>
          <div className="bar-butiit"></div>
        </div>
        <div className={`stepw ${this.props.bar > 4 ? "active" : ""}`}>
          <div className="bulletrr">3</div>
        </div>
      </div>
    );
  }
}

export default BaxBar;
