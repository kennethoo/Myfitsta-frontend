import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
class Settinginterest extends Component {
  container = React.createRef();
  state = {
    open: false,
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
          <button
            onClick={(e) => {
              this.handleclick(true, e);
            }}
            className="close-thaet"
          >
            <IoEllipsisVertical />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <MdEdit />
            </div>
            <button className="edit-the-program">Edit interest</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Settinginterest);
