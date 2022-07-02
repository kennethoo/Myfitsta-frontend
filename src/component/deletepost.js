import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoCloseSharp, IoConstructOutline } from "react-icons/io5";
import { connect } from "react-redux";
class DeletePost extends Component {
  state = {};

  deleteCollecion = () => {
    console.log(this.props.deletePost);
  };

  render() {
    return (
      <div
        className={`overlayrjhhntufbghjdjhb ${
          this.props.deletePost.open == true ? "active" : ""
        }`}
      >
        <div className="delete-the-colletion">
          <div className="Create-a-new-list-title">
            <p>Delete Post</p>
            <div
              onClick={() => {
                this.props.removePost({ open: false, file: "" });
              }}
              className="back-button"
            >
              <IoCloseSharp />
            </div>
          </div>
          <p className="rteisjr">
            Are you sure you want to delete this Post ?{" "}
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

const mapDispatchToProps = (dispatch) => {
  return {
    removePost: (data) => {
      dispatch({ type: "DELETE_POST", data: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
    deletePost: state.deletePost,
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(DeletePost));
