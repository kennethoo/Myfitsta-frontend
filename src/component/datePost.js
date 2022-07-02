import React, { Component } from "react";
import moment from "moment";
class DataPost extends Component {
  state = {
    date: "",
  };

  update = () => {
    this.setState({
      date: moment(this.props.date).fromNow(),
    });
  };

  componentDidMount = () => {
    this.setState({
      date: moment(this.props.date).fromNow(),
    });
    setInterval(() => {
      this.update();
    }, 10000);
  };

  render() {
    return <div className="gjjgkkg-overrjjrlay ">{this.state.date}</div>;
  }
}

export default DataPost;
