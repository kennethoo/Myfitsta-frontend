import React, { Component } from "react";

export default class CopyLinks extends Component {
  state = {
    copied: false,
  };
  copy = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    this.setState({
      copied: true,
    });
  };

  render() {
    return (
      <div className="box-that-hold-the-setting">
        <div className="hold-thatiocom">
          <i className="fas fa-link"></i>
        </div>
        <button onClick={this.copy}>
          {!this.state.copied ? "Copy link" : "Copied!"}
        </button>
      </div>
    );
  }
}
