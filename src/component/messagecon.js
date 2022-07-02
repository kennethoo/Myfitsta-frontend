import React, { Component } from "react";
import MenuMessage from "../messaging/messagemenu";
import { connect } from "react-redux";
class MessageCon extends Component {
  state = {
    icon: null,
  };

  componentDidMount = () => {
    document.querySelector(".box-hold-convertion").scrollTop =
      document.querySelector(".box-hold-convertion").scrollHeight;
  };
  render() {
    return (
      <div className="fesjte">
        {this.props.users.userid == this.props.message.sender ? (
          <div className="bfhehbfbhe">
            <MenuMessage
              handleRemove={this.props.handleRemove}
              item={this.props.message}
            />
          </div>
        ) : (
          ""
        )}

        <div className="rjjrjjs">
          <div className="hold-converstation">{this.props.message.content}</div>
          <div className="hold-thjat-data"></div>
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

export default connect(mapstateToProps)(MessageCon);
