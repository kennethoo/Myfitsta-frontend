import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
class Menupost extends Component {
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
        className={`overlay-that-horlt-it  ${
          this.props.setting == false ? "" : "active"
        }`}
      >
        <div className="boxmrjrjenue">
          <div className="title-of--thise-action">
            <p>Post</p>
            <button
              onClick={() => this.props.handlOpen(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="tisjjrjrjr">
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="fas fa-share"></i>
              </div>
              <button className="edit-the-program">Share post</button>
            </div>
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="fas fa-user-alt"></i>
              </div>
              <button className="edit-the-program">Profile</button>
            </div>
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="far fa-envelope"></i>
              </div>
              <button className="edit-the-program">Send message</button>
            </div>
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="fas fa-flag"></i>
              </div>
              <button className="edit-the-program">Report</button>
            </div>
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <IoCloseSharp />
              </div>
              <button className="edit-the-program">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menupost;
