import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
class SettingMyfiststapro extends Component {
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
        <Link to={"/setting/myfistapro"} className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-edit"></i>
          </div>
          <button className="edit-the-program">Edit Profile</button>
        </Link>

        <div
          onClick={() => this.props.handlOpen(true)}
          className="box-that-hold-the-setting"
        >
          <div className="hold-thatiocom">
            <i className="fas fa-plus"></i>
          </div>
          <button className="edit-the-program">Create a Program</button>
        </div>

        <div className="box-that-hold-the-setting">
          <div className="hold-thatiocom">
            <i className="fas fa-share"></i>
          </div>
          <button
            onClick={() => {
              this.props.handleSettingg(true);
            }}
            className="edit-the-program"
          >
            Share Profile
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SettingMyfiststapro);
