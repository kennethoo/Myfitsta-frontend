import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import ApiUrl from "../url";
class DeleteProgram extends Component {
  state = {};

  deleteCollecion = () => {
    let option = {
      AuthorId: this.props.program.AuthorId,
      programId: this.props.program.programId,
    };
    axios
      .post(`${ApiUrl.Three}handle-the-delete-program`, option)
      .then((result) => {
        window.location.reload();
      });
  };

  render() {
    return (
      <div
        className={`overlayrjhhntufbghjdjhb ${
          this.props.deleteProgram == true ? "active" : ""
        }`}
      >
        <div className="delete-the-colletion">
          <div className="Create-a-new-list-title">
            <div
              onClick={() => {
                this.props.optionchangeP(false);
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </div>
            <p>Delete Program</p>
          </div>
          <p className="rteisjr">
            Are you sure you want to delete this Program ?{" "}
          </p>
          <div className="yes-no">
            <button
              onClick={() => {
                this.deleteCollecion();
              }}
            >
              Yes Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DeleteProgram);
