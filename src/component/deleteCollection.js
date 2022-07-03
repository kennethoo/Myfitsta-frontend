import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import ApiUrl from "../url";

class DeleteCollection extends Component {
  state = {
    open: false,
  };
  deleteCollecion = () => {
    let option = {
      id: this.props.collection.userId,
      collectionName: this.props.collection.collectionName,
    };
    axios.post(`/api/delete/Collection`, option).then((res) => {
      window.location.reload();
    });
  };

  render() {
    return (
      <div
        className={`overlay-to-deletet ${
          this.props.deleteCollection == true ? "active" : ""
        }`}
      >
        <div className="delete-the-colletion">
          <div className="Create-a-new-list-title">
            <div
              onClick={() => {
                this.props.optionchange(false, false);
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </div>
            <p>Delete Collection</p>
          </div>
          <p className="rteisjr">
            Are you sure you want to delete this collection ?{" "}
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

export default withRouter(DeleteCollection);
