import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
class Settingprogram extends Component {
  state = {
    open: false,
    title: "",
    description: "",
    file: null,
    button: false,
    preview: null,
  };

  render() {
    return (
      <div
        className={`boxmenue  ${this.props.setting == false ? "" : "active"}`}
      >
        <div className="title-of--thise-action rhbrnr">
          <p>Setting</p>
          <button
            onClick={() => this.props.handleSetting(false)}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
        </div>

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-rocket"></i>
          </div>
          <button
            onClick={() => this.props.handlepublish(true)}
            className="publish-the-program"
          >
            Report
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Settingprogram);
