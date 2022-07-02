import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import NotificationBasicBox from "../notification/notificationBasicBox";
import NotificationProBox from "../notification/noticationProBox";
import { withRouter } from "react-router-dom";
import Search from "../component/seach";
import { BiArrowBack } from "react-icons/bi";
import ApiUrl from "../url";
import Navbom from "../component/navbom";
import DropHomeUp from "../component/dropHomeUp";

let source;
source = axios.CancelToken.source();
class Notification extends Component {
  state = {
    id: "",
    search: false,
    basic: null,
    tabsDeafalt: true,
    mouted: true,
    fitstanot: null,
    numberToLoad: 0,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  LoadMore = () => {};
  handloption = (data) => {
    this.setState({
      drop: data,
    });
  };
  goBack = () => {
    this.props.history.goBack();
  };

  handleSwich = (data) => {
    this.setState({
      tabsDeafalt: data,
    });
  };

  loadNotification = () => {
    axios
      .get(`${ApiUrl.Three}load-notiionbasic/${this.props.user.userid}/${10}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data !== "no") {
          if (this.state.mouted) {
            this.setState({
              basic: res.data.data,
            });
          }
        } else {
          if (this.state.mouted) {
            this.setState({
              basic: "no",
            });
          }
        }
      });
  };

  loadNotificationPro = () => {
    axios
      .get(`${ApiUrl.Three}load-notiionpro/${this.props.user.userid}/${10}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data !== "no") {
          if (this.state.mouted) {
            this.setState({
              fitstanot: res.data.data,
            });
          }
        } else {
          if (this.state.mouted) {
            this.setState({
              fitstanot: "no",
            });
          }
        }
      });
  };

  openSearch = (data) => {
    if (this.state.mouted) {
      this.setState({
        search: data,
      });
    }
  };

  handleUpdateCount = () => {
    axios
      .post(
        `${ApiUrl.Three}update-number-of-notification/${this.props.user.userid}`
      )
      .then((result) => {
        return;
      });
  };
  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  componentDidMount = () => {
    this.loadNotificationPro();
    this.handleUpdateCount();
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wrapeirjwern">
              <div className="notification">
                <div className="notification-box">
                  <div className="control-back">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p>Notifications</p>
                    </div>
                  </div>
                  <div className="Notification-tabs">
                    <div
                      onClick={() => {
                        this.handleSwich(true);
                      }}
                      className={`boxj-thsttjsntnd ${
                        this.state.tabsDeafalt == true ? "active" : ""
                      }`}
                    >
                      All
                    </div>
                    <div
                      onClick={() => {
                        this.handleSwich(false);
                      }}
                      className={`boxj-thsttjsntnd ${
                        this.state.tabsDeafalt == false ? "active" : ""
                      }`}
                    >
                      MyFistapro
                    </div>
                  </div>
                  <div className="hold-thodisjhjijjrnbbd">
                    {this.state.tabsDeafalt == true ? (
                      <NotificationBasicBox userid={this.props.user.userid} />
                    ) : (
                      ""
                    )}
                    {this.state.tabsDeafalt == false ? (
                      <NotificationProBox userid={this.props.user.userid} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <Search
                user={this.props.user}
                openSearch={this.openSearch}
                seach={this.state.search}
              />
            </div>

            <Navbom handloption={this.handloption} />
          </div>
        </div>

        {this.state.drop == true ? (
          <DropHomeUp handloption={this.handloption} drop={this.state.drop} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Notification);
