import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../url";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";
import DataPost from "../component/datePost";
import { motion } from "framer-motion";
import { SiGooglemaps } from "react-icons/si";
import socket from "../socketConfig";
import { connect } from "react-redux";
class LoginActivity extends Component {
  state = {
    detail: null,
  };
  goBack = () => {
    this.props.history.goBack();
  };

  checkLogin = () => {
    axios.get("/api/check-login", { withCredentials: true }).then((res) => {
      if (res.data.userid) {
        this.getlogetactivity();
      } else {
        window.location.reload();
      }
    });
  };

  logout = (item) => {
    let option = {
      id: item._id,
    };
    axios
      .post("/api/remove/session", option, { withCredentials: true })
      .then((result) => {
        socket.emit("check-thatlogind", this.props.users.userid);
      });
  };

  getlogetactivity = () => {
    axios.get("/api/sessions", { withCredentials: true }).then((result) => {
      if (result.data.succes) {
      } else {
        this.setState({
          detail: result.data,
        });
      }
    });
  };
  componentWillUnmount = () => {
    socket.off("check-everone-login-activity");
  };
  componentDidMount = () => {
    this.getlogetactivity();
    socket.on("check-everone-login-activity", () => {
      this.checkLogin();
    });
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Login Activity</p>
          </div>
        </div>
        <div className="hols-tjsjttnej">
          <div className="rjeiwroknr">
            <p>All device that are login to your account will be listed here</p>
          </div>
        </div>
        <div className="psjriroor">
          {this.state.detail !== null
            ? this.state.detail.map((item, index) => {
                return (
                  <motion.div layout key={index} className="wlofnssfjr">
                    <div className="wraricjfri">
                      <div className="cikxjjf">
                        <SiGooglemaps />
                      </div>
                      <div className="load-fgjfj">
                        {/*    <div className="wifioftit">
{item.session.user.region},{item.session.user.city}
    </div>*/}
                        <div className="wifioftit">
                          <div className="dateitir">
                            <DataPost date={item.session.user.time} />
                          </div>
                          <div className="dateitir">
                            {item.session.user.device}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tabsjdjdj">
                      <button>
                        <Link to={"/setting/changePassword"}>
                          Change Password
                        </Link>
                      </button>
                      <button
                        onClick={() => {
                          this.logout(item);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(LoginActivity));
