import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoCloseSharp, IoConstructOutline } from "react-icons/io5";
class DeleteContent extends Component {
  state = {};

  deleteCollecion = () => {};

  render() {
    return (
      <div
        className={`overlayrjhhntufbghjdjhb ${
          this.props.deleteContent == true ? "active" : ""
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
            <p>Delete content</p>
          </div>
          <p className="rteisjr">
            Are you sure you want to delete this contents ?{" "}
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

export default withRouter(DeleteContent);
