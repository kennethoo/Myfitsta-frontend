import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import { withRouter } from "react-router-dom";

import ApiUrl from "../url";
class Mode extends Component {
  state = {
    theme: "",
  };

  loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
    this.setState({
      theme: theme,
    });
  };
  handleClick = (data) => {
    this.loadTheme(data);
  };

  componentDidMount = () => {
    this.setState({
      theme: localStorage.getItem("mode"),
    });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Theme</p>
          </div>
        </div>

        <div
          onClick={() => {
            this.handleClick("light");
          }}
          className="them-selxteskskf"
        >
          <p>Light</p>
          <div
            className={`add-to-this-collection  ${
              this.state.theme == "light" ? "active" : ""
            }`}
          >
            <div className="savethat-ccolelti"></div>
          </div>
        </div>

        <div
          onClick={() => {
            this.handleClick("dark");
          }}
          className="them-selxteskskf"
        >
          <p>Dark</p>
          <div
            className={`add-to-this-collection  ${
              this.state.theme == "dark" ? "active" : ""
            }`}
          >
            <div className="savethat-ccolelti "></div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Mode);
