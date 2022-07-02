import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
class OptionComment extends Component {
  container = React.createRef();
  state = {
    open: false,
  };

  handleclick = (data) => {
    this.setState({
      open: data,
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handleclick(false);
    } else {
    }
  };
  componentDidMount = () => {
    console.log(this.props.item);
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
            onClick={() => {
              this.handleclick(true);
            }}
            className="close-that"
          >
            <IoEllipsisHorizontalSharp />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          {this.props.users.userid == this.props.item.UserId ? (
            <div className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <MdDelete />
              </div>
              <button className="edit-the-program">Delete</button>
            </div>
          ) : (
            ""
          )}

          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="fas fa-flag"></i>
            </div>
            <button className="edit-the-program">Report</button>
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

export default connect(mapstateToProps)(withRouter(OptionComment));
