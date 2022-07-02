import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ApiUrl from "../url";
import profile from "../profile.webp";
import socket from "../socketConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";

class IconProfile extends Component {
  state = {
    icon: null,
    live: null,
  };
  checklive = () => {
    axios.get(`${ApiUrl.Three}check-live/${this.props.user}`).then((res) => {
      if (res.data !== "no") {
        this.setState({
          live: res.data,
        });
      } else {
        this.setState({
          live: null,
        });
      }
    });
  };

  loadImage = () => {
    let userFind = this.props.iconList.filter(
      (item) => item.userid == this.props.user
    );
    if (userFind.length > 0) {
      this.setState({
        icon: userFind[0].icon,
      });
    } else {
      axios.get(`${ApiUrl.Three}icon/${this.props.user}`).then((res) => {
        if (res.data !== "no") {
          this.setState({
            icon: res.data,
          });

          let option = { userid: this.props.user, icon: res.data };
          let list = [...this.props.iconList, option];
          this.props.UpdateList(list);
        }
      });
    }
  };

  componentDidMount = () => {
    socket.on("new-live-user", (data) => {
      if (this.props.live !== undefined) {
        this.checklive();
      }
    });
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
            <LazyLoadImage
              alt={"image.alt"}
              effect="blur"
              height="100%"
              src={`${ApiUrl.content}${this.state.icon}`}
              width="100%"
            />
          ) : (
            <LazyLoadImage
              alt={"image.alt"}
              effect="blur"
              height="100%"
              src={profile}
              width="100%"
            />
          )
        ) : (
          <div className="jejerjrnnnf"></div>
        )}
        {this.state.live !== null ? (
          <Link to={`/live/${this.state.live.roomId}`} className="wrapor">
            <div className="blob"></div>
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
    iconList: state.iconList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateList: (data) => {
      dispatch({ type: "UPDATE_ICON", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(IconProfile);
