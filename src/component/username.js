import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { connect } from "react-redux";
import ProfileModal from "../component/profillemodal";
import logo from "../logo/logo.png";
import { Link } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Username extends Component {
  state = {
    username: null,
    call: false,
    profile: {},
    monted: true,
    user: "",
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  username = () => {
    let userFind = this.props.usernameList.filter(
      (item) => item.userid == this.props.user
    );
    if (userFind.length > 0) {
      this.setState({
        username: userFind[0],
      });
    } else {
      axios
        .get(`/api/username/${this.props.user}`, {
          cancelToken: source.token,
        })
        .then((res) => {
          if (res.data !== "no" && this.state.monted) {
            res.data.userid = this.props.user;
            this.setState({
              username: res.data,
            });
            let list = [...this.props.usernameList, res.data];
            this.props.Updatelist(list);
          }
        });
    }
  };

  loadProfile = () => {
    axios
      .get(`/api/profile/${this.props.user}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.Username && this.state.monted) {
          this.setState({
            profile: res.data,
          });
        }
      });
  };

  hover = () => {
    if (this.state.profile.user) {
    } else {
      this.loadProfile();
    }
  };

  componentDidUpdate(prevProps) {
    if (this.state.user !== this.props.user) {
      if (this.state.monted == true) {
        this.username();
        this.setState({ user: this.props.user });
      }
    }
  }

  componentDidMount = () => {
    this.setState({ user: this.props.user }, () => {
      this.username();
    });
  };

  render() {
    return (
      <div
        onMouseOver={this.hover}
        onMouseOut={this.out}
        className="usernsmr-the-compoocnf"
      >
        {this.state.username !== null ? (
          this.props.link == true ? (
            <div className="srjhsur">
              {this.state.username.username == this.props.users.Username ? (
                <Link
                  className={`rnwjrkwr ${
                    this.props.go !== undefined ? "active" : ""
                  }`}
                  to={`/profile`}
                >
                  {this.state.username.username}
                </Link>
              ) : (
                <Link
                  className={`rnwjrkwr ${
                    this.props.go !== undefined ? "active" : ""
                  }`}
                  to={`/account/${this.state.username.username}`}
                >
                  {this.state.username.username}
                </Link>
              )}
              {this.state.username.pro == true ? (
                <div className="wfjiriej">
                  <img src={logo} />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <p>{this.state.username.username}</p>
          )
        ) : (
          <div className="uisiiirjr"></div>
        )}
        <div className="wraprjkrrrj">
          <ProfileModal
            profile={this.state.profile}
            call={this.state.call}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
    usernameList: state.usernameList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Updatelist: (data) => {
      dispatch({ type: "UPDATE_USERNAME", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(Username);
