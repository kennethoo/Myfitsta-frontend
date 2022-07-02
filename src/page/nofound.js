import React, { Component } from "react";
import Navland from "../landing/Navland";
import image from "../image/nofound.svg";
import Fade from "react-reveal/Fade";
class NoFound extends Component {
  switchToggle = () => {
    this.setState({
      mode: !this.state.mode,
    });
    localStorage.setItem("mode", !this.state.mode);
  };
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };
  render() {
    return (
      <div className="wrpatrrbox">
        <Navland switchToggle={this.switchToggle} openNav={this.openNav} />
        {/*<div className="wraperrr-jsjjr">
    <div className="opemme"></div>
    <div className="opemme">    <img src={image}/></div>
                </div>*/}
        <div className="wraperrr-jsjjr">
          <div className="fjsfieiitwiree">
            <div className="rrrsrte">
              <Fade left cascade>
                {" "}
                404
              </Fade>
            </div>
            <div className="rrkrr">
              <Fade left cascade>
                {" "}
                We can't seem to find the page you're looking for
              </Fade>
            </div>

            <div className="rrtrjtjtkrr">
              <button>
                <a href="/">Back to Homepage</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NoFound;
