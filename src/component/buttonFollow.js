import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { connect } from "react-redux";
import ApiUrl from "../url";
import moment from "moment";
import Username from "../component/username";
import { IoCloseSharp } from "react-icons/io5";
class ButtonFollow extends Component {
  state = {
    follow: null,
    loading: false,
    unfollow: false,
    monted: false,
  };

  updatenotification = () => {
    let option = {
      userid: this.props.friend,
      type: "follow",
      notifiyiId: this.props.users.userid,
      media: this.props.users.userid,
      date: moment().format(),
      extraInfo: "",
    };
    axios.post(`${ApiUrl.Three}update-notification`, option).then((res) => {});
  };

  activeFollow = () => {
    this.setState({
      unfollow: !this.state.unfollow,
    });
  };

  follow = () => {
    let dataUser = {
      User: this.props.users.userid,
      ToFollow: this.props.friend,
    };
    this.setState({
      follow: true,
    });
    axios.post("/api/update-fo", dataUser).then((res) => {});
    this.updatenotification();
  };
  removeFollow = () => {
    let option = {
      User: this.props.users.userid,
      ToUnfollow: this.props.friend,
    };
    this.activeFollow();
    this.setState({
      follow: false,
    });
    axios
      .post("/api/unfollowrequest", option, { withCredentials: true })
      .then((result) => {
        if (this.state.monted == true) {
          let list = this.props.followLists.filter(
            (item) => item !== this.props.friend
          );
          this.props.updataFollow(list);
        }
      });
  };

  checkFollow = () => {
    if (this.props.followLists.includes(this.props.friend)) {
      this.setState({
        follow: true,
      });
    } else {
      axios
        .get(
          `/api/checkfollower/${
            this.props.users.userid + "," + this.props.friend
          }`,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data == true) {
            let data = this.props.followLists;
            data.push(this.props.friend);
            this.props.updataFollow(data);
            this.setState({
              follow: true,
            });
          } else {
            this.setState({
              follow: false,
            });
          }
        });
    }
  };
  componentWillUnmount = () => {
    this.setState({
      monted: false,
    });
  };
  componentDidMount = () => {
    this.setState({
      monted: true,
    });
    this.checkFollow();
  };

  render() {
    return (
      <div
        className={`wriffjjxif ${
          this.props.users.userid == this.props.friend
            ? ""
            : this.state.follow !== null
            ? this.state.follow == true
              ? ""
              : "fol"
            : ""
        }`}
      >
        {this.props.activeBox ? (
          <div className="hold-thatiocom">
            <MdDelete />
          </div>
        ) : (
          ""
        )}
        {this.props.users.userid == this.props.friend ? (
          <button>
            <Link to="/profile">Profile</Link>{" "}
          </button>
        ) : this.state.follow !== null ? (
          this.state.follow == true ? (
            <button onClick={this.activeFollow}>Follow </button>
          ) : (
            <button onClick={this.follow} className="active">
              Follow{" "}
            </button>
          )
        ) : (
          <div className="jrkjrijrrrj"></div>
        )}
        {this.state.unfollow == true ? (
          <div className="unfolowbox">
            <div className="delete-the-colletion ajrjjrj">
              <div className="title-of--thise-action-e">
                <div onClick={this.activeFollow} className="close-that">
                  <IoCloseSharp />
                </div>
                <div className="fjjtutjsjr">
                  <p className="rkerr">Unfollow</p>{" "}
                  <div className="fheijwhr">
                    <Username user={this.props.friend} />
                  </div>
                </div>
              </div>
              <div className="jfkjworf">
                Their post will no longer appear in your feed. You can still
                look at their profile.{" "}
              </div>
              <div className="conte-thise-actionrrr active">
                <button onClick={() => this.removeFollow()}>UNFOLLOW</button>
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

const mapstateToProps = (state) => {
  return {
    users: state.user,
    followLists: state.followList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updataFollow: (data) => {
      dispatch({ type: "UPDATE_FOLLOWER", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(ButtonFollow);
