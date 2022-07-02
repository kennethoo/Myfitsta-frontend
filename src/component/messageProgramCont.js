import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-readux";

class MessageProgramCon extends Component {
  state = {
    data: null,
  };

  loadProgramPWithsibscrption = () => {
    axios
      .post(`/api/program-chech-subscription/${this.props.item.content}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.loadProgramPWithsibscrption();
  };
  render() {
    return <div className="wrspejrj-profilej chh"></div>;
  }
}

const mapstateToProps = (state) => {
  return {
    users: user.state,
  };
};

export default connect(mapstateToProps)(MessageProgramCon);
