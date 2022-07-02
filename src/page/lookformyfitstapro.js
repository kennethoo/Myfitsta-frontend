import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../style/setup.css";
import Myfitstapr from "../page/subscrition";
import Shoping from "../page/shopingcourse";
import _ from "lodash";
let source;
source = axios.CancelToken.source();
class Lookformyfitstapro extends Component {
  state = {
    setting: false,
    subscribe: false,
    subscribeCheck: false,
    plan: [],
    subscribeBox: false,
    program: [],
    profile: null,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  getData = () => {
    axios
      .get(`/api/myfitsta/account/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.userid) {
          if (res.data.userid == this.props.user.userid) {
            //this.props.history.push("/myfitstapro")
          } else {
            this.setState({
              profile: res.data,
            });
          }
        } else {
          this.props.history.push("/");
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          {this.state.profile !== null ? (
            this.state.profile.accountType == 1 ? (
              <Shoping user={this.props.user} />
            ) : (
              <Myfitstapr user={this.props.user} />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Lookformyfitstapro);
