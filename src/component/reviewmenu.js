import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ApiUrl from "../url";
import { connect } from "react-redux";

class ReviewMenu extends Component {
  container = React.createRef();
  state = {
    open: false,
    report: {},
  };

  handleDelete = () => {
    axios
      .post(`${ApiUrl.Three}remove-my-rate`, this.props.item)
      .then((result) => {
        this.props.updateReviews(this.props.counterReview + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleclick = (data, e) => {
    if (e != null) {
      if (e.currentTarget.parentElement.parentElement !== null) {
        let box = e.currentTarget.parentElement.parentElement;
        console.log(window.innerHeight - box.getBoundingClientRect().bottom);
        if (window.innerHeight - box.getBoundingClientRect().bottom <= 200) {
          this.setState({
            top: false,
          });
        } else {
          this.setState({
            top: true,
          });
        }
      }
    }

    this.setState({
      open: data,
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handleclick(false, null);
    } else {
    }
  };
  componentDidMount = () => {
    this.setState({
      report: {
        open: true,
        file: this.props.item.filename,
        kind: "Reviews",
      },
    });

    document.addEventListener("mousedown", this.handleClickOutside);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  render() {
    return (
      <div
        className={`boxmrjrjerjrjnue ${this.state.top == true ? "top" : "top"}`}
        ref={this.container}
      >
        <div className="title-of--thise-action">
          <button
            onClick={(e) => {
              this.handleclick(true, e);
            }}
            className="close-that"
          >
            <IoEllipsisHorizontalSharp />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          <div
            className={`box-that-hold-the-setting ${
              this.props.item.AnthorId !== this.props.users.userid
                ? "disparais"
                : ""
            }`}
          >
            <div className="hold-thatiocom">
              <MdDelete />
            </div>
            <button onClick={this.handleDelete} className="edit-the-program">
              Delete
            </button>
          </div>

          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="fas fa-flag"></i>
            </div>
            <button
              onClick={() => {
                this.props.updataReport(this.state.report);
              }}
              className="edit-the-program"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReviews: (data) => {
      dispatch({ type: "UPDATE_REVIEW", data: data });
    },
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", data: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
    counterReview: state.counterReview,
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(ReviewMenu));
