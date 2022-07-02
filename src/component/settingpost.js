import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { withRouter } from "react-router-dom";
class SettingPost extends Component {
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
            <i className="fas fa-share"></i>
          </div>
          <button className="edit-the-program">Share Profile</button>
        </div>

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-user-minus"></i>
          </div>
          <button className="edit-the-program">Unsubscribe</button>
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

export default withRouter(SettingPost);
