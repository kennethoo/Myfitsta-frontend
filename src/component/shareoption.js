import React, { Component } from "react";
import CopyLinks from "../component/copyLink";
import { IoCloseSharp } from "react-icons/io5";
class ShareOption extends Component {
  state = {};

  render() {
    return (
      <div
        className={`over-lay-theshare  ${
          this.props.shareoption == false ? "" : "active"
        }`}
      >
        <div className="div-that-wrap-thesetting">
          <div className="title-of--thise-action rhbrnr">
            <button
              onClick={() => this.props.handleSetting(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>Share</p>
          </div>
          <div className="wraprkrkrrrr">
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="far fa-envelope"></i>
              </div>
              <button
                onClick={() => {
                  this.props.handlOpenS(true);
                }}
                className="edit-the-program"
              >
                Send via Direct Message
              </button>
            </div>
            <CopyLinks />
          </div>
        </div>
      </div>
    );
  }
}

export default ShareOption;
