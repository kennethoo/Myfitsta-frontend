import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { Link } from "react-router-dom";
import profile from "../profile.webp";
class ProIcon extends Component {
  state = {
    icon: null,
    live: null,
  };

  checklive = () => {
    axios.get(`/api/check-live/${this.props.user}`).then((res) => {
      if (res.data !== "no") {
        this.setState({
          live: res.data,
        });
      }
    });
  };

  loadImage = () => {
    axios.get(`/api/iconpro/${this.props.user}`).then((res) => {
      if (res.data !== "no") {
        this.setState({
          icon: res.data,
        });
      }
    });
  };

  componentDidMount = () => {
    this.loadImage();
    if (this.props.live !== undefined) {
      this.checklive();
    }
  };
  render() {
    return (
      <div
        className={`wraper-the-component-iocnf ${
          this.state.live !== null ? "active" : ""
        }`}
      >
        {this.state.icon !== null ? (
          this.state.icon.length > 0 ? (
            <img src={`${ApiUrl.content}${this.state.icon}`} loading="lazy" />
          ) : (
            <img src={profile} loading="lazy" />
          )
        ) : (
          ""
        )}
        {this.state.live !== null ? (
          <Link
            to={`/live/${this.state.live.roomId}`}
            className={`box-that-state-live ${
              this.state.live !== null ? "active" : ""
            }`}
          >
            <p>LIVE</p>
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default ProIcon;
