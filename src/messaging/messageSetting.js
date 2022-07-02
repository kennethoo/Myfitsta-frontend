import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
class MessageSetting extends Component {
  container = React.createRef();
  state = {
    open: false,
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
            className="close-that"
          >
            <AiOutlinePlus />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open == true ? "active" : ""}`}
        >
          <div className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <FaUserAlt />
            </div>
            <button
              onClick={() => {
                this.props.handleopen(true);
              }}
              className="edit-the-program"
            >
              New message
            </button>
          </div>

          {/*  <div  className="box-that-hold-the-setting">
                    <div className="hold-thatiocom">
           <BsPeopleFill/>
                    </div>
                    <button onClick={this.props.handleGroupOpen} className="edit-the-program">New Group</button>
                    </div>*/}
        </div>
      </div>
    );
  }
}

export default withRouter(MessageSetting);
