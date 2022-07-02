import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
class SettingHisProgram extends Component {
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
          <button
            onClick={() => this.props.handleSetting(false)}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
          <p>Setting</p>
        </div>

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-star"></i>
          </div>
          <button className="edit-the-program">Rate</button>
        </div>

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-share"></i>
          </div>
          <button className="edit-the-program">Share</button>
        </div>
        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-flag"></i>
          </div>
          <button className="edit-the-program">Report</button>
        </div>
      </div>
    );
  }
}

export default withRouter(SettingHisProgram);
