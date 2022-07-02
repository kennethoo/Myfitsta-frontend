import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
class PostOption extends Component {
  container = React.createRef();
  state = {
    open: false,
    top: false,
    report: {},
  };

  handleclick = (data, e) => {
    if (e != null) {
      if (e.currentTarget.parentElement.parentElement !== null) {
        let box = e.currentTarget.parentElement.parentElement;

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

  message = () => {
    let option = {
      id: this.props.friend,
      user: this.props.user.userid,
      profileGroup: "",
      type: "inbox",
      members: [],
      name: "",
      conversationId: "",
    };

    axios
      .post(`/api/add/to/conversattion`, option, { withCredentials: true })
      .then((result) => {
        this.props.history.push(`/message/${this.props.friend}`);
      });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      if (this.state.open == true) {
        this.handleclick(false, null);
      }
    } else {
    }
  };
  componentDidMount = () => {
    this.setState({
      report: {
        open: true,
        file: this.props.item.filename,
        kind: "Post",
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
            <IoEllipsisVertical />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="fas fa-share"></i>
            </div>
            <button
              onClick={() => {
                this.props.handleSetting(true, this.props.item.filename);
              }}
              className="edit-the-program"
            >
              Share post
            </button>
          </div>
          {this.props.users.userid !== this.props.item.userId ? (
            <div
              onClick={() => {
                this.message();
              }}
              className="box-that-hold-the-setting"
            >
              <div className="hold-thatiocom">
                <i className="far fa-envelope"></i>
              </div>
              <button className="edit-the-program">Send message</button>
            </div>
          ) : (
            ""
          )}

          {this.props.users.userid == this.props.item.userId ? (
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <MdDelete />
              </div>
              <button className="edit-the-program">Delete</button>
            </div>
          ) : (
            ""
          )}
          {/* {this.props.user.userId!==this.props.item.userId?<div className="follenn-ejrnhr">
             <ButtonFollow  activeBox={true}  friend ={this.props.item.userId}  />
             </div>:""} */}
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

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", data: data });
    },
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(PostOption));
