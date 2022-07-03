import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import ApiUrl from "../url";
class MenuMessage extends Component {
  container = React.createRef();
  state = {
    open: false,
    top: false,
    report: {},
  };

  hanldleDelete = () => {
    let option = {
      id: this.props.item._id,
    };

    this.props.handleRemove(this.props.item._id);
    axios
      .post(`/api/remove-message/from/conversation`, option)
      .then((result) => {});
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
    axios
      .get(
        `/api/add/${this.props.friend}/to/${this.props.user.userid}/conversattion`,
        { withCredentials: true }
      )
      .then((result) => {
        this.props.history.push(`/message/${result.data}`);
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
    document.addEventListener("mousedown", this.handleClickOutside);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  render() {
    return (
      <div
        className={`boxmrjrjerjrjnue ${
          this.state.top == true ? "top" : "bottom"
        }`}
        ref={this.container}
      >
        <div className="title-of--thise-action">
          <button onClick={this.hanldleDelete} className="close-that">
            <MdDelete />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <MdDelete />
            </div>
            <button
              onClick={() => {
                this.props.handleSetting(true, this.props.item.filename);
              }}
              className="edit-the-program"
            >
              Delete
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

export default connect(mapstateToProps)(withRouter(MenuMessage));
