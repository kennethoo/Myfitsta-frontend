import React, { Component } from "react";
import ApiUrl from "../url";
import axios from "axios";
import profile from "../profile.webp";
class BoxAccount extends Component {
  container = React.createRef();
  state = {
    open: false,
  };

  handleClick = (data) => {
    this.setState({
      open: data,
    });
  };
  logout = () => {
    axios.get("/api/logoutt", { withCredentials: true }).then((res) => {
      window.location.reload();
    });
  };
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handleClick(false);
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
      <div className="wraper-boxndrrb">
        <div
          onClick={
            this.state.open == false
              ? () => {
                  this.handleClick(true);
                }
              : () => {
                  this.handleClick(false);
                }
          }
          className="info-pro-log"
        >
          <div className="picti-pro">
            {this.props.user.profile.length > 0 ? (
              <img
                className="pect-ppr"
                src={`${ApiUrl.content}${this.props.user.profile}`}
                loading="lazy"
              />
            ) : (
              <img className="pect-ppr" src={profile} loading="lazy" />
            )}
          </div>
          <div className="descrp-pr">
            <p>{this.props.user.Username}</p>
            <p>{this.props.user.fullName}</p>
          </div>
          <div className="jjfjjfjfjjrjrr"></div>
        </div>
        {this.state.open == true ? (
          <div ref={this.container} className="wraprrr-rrrj">
            <div className="boxnfjjr"></div>
            <div className="jjrrrtjjtjtt">
              <div className="info-pro-log bb">
                <div className="picti-pro">
                  {this.props.user.profile.length > 0 ? (
                    <img
                      className="pect-ppr"
                      src={`${ApiUrl.content}${this.props.user.profile}`}
                      loading="lazy"
                    />
                  ) : (
                    <img className="pect-ppr" src={profile} loading="lazy" />
                  )}
                </div>
                <div className="descrp-pr">
                  <p>{this.props.user.Username}</p>
                  <p>{this.props.user.fullName}</p>
                </div>
              </div>
              <div onClick={this.logout} className="lod-out-thdfjrj">
                Log out
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BoxAccount;
