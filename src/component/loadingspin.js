import React, { Component } from "react";
class LoadingSpin extends Component {
  render() {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default LoadingSpin;
