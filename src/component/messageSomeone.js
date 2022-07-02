import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class MessageButton extends Component {
  message = () => {
    let option = {
      id: this.props.friend,
      user: this.props.users.userid,
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

  componentDidMount = () => {};
  render() {
    return (
      <div>
        <button onClick={this.message} id="messh">
          Message
        </button>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(MessageButton));
