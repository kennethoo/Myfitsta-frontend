import React, { Component } from "react";
import "../style/landing.css";
import HomeLand from "../landing/home";
class Landing extends Component {
  state = {
    username: "",
  };

  componentDidMount = () => {};
  handleChange = () => {};
  render() {
    return (
      <div id="ffnnf">
        <HomeLand />
      </div>
    );
  }
}

export default Landing;
