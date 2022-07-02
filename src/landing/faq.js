import React, { Component } from "react";
import Navland from "./Navland";

class Faq extends Component {
  state = {};
  switchToggle = () => {
    this.setState({
      mode: !this.state.mode,
    });
    localStorage.setItem("mode", !this.state.mode);
  };
  loadTheme = (theme) => {
    const root = document.querySelector(":root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
  };
  render() {
    return (
      <div className={`homne-page`}>
        <Navland switchToggle={this.switchToggle} openNav={this.openNav} />
      </div>
    );
  }
}

export default Faq;
