import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../url";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import SubscriptionInfo from "../subscription/subscriptioninfo";
class Subcription extends Component {
  state = {
    loading: true,
    list: null,
  };
  goBack = () => {
    this.props.history.goBack();
  };

  handlePgram = () => {
    let option = {
      userid: this.props.user.userid,
    };
    axios.post(`/api/get-my-programm`, option).then((res) => {
      if (res.data !== "no") {
        let list = res.data.data.filter((item) => item.kind == 0);
        if (list.length > 0) {
          this.setState({
            list: list,
          });
        } else {
          this.setState({
            list: "no",
          });
        }
      } else {
        this.setState({
          list: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.handlePgram();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Subscription & order</p>
          </div>
        </div>
        <div className="wraper-boxx-for-siucn">
          <div className="box-table-tabs">
            <div className="box-peopler active">Subcriptions</div>
          </div>

          {this.state.list !== null ? (
            this.state.list !== "no" ? (
              <div className="holt-the-wiri-subbr">
                {this.state.list.map((item, index) => {
                  return <SubscriptionInfo key={index} item={item} />;
                })}
              </div>
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>No Subsciption</p>
                  <p>
                    When you subscribe to someone you will be able to see it
                    here
                  </p>
                </div>
              </div>
            )
          ) : (
            ""
          )}

          <div className="holt-the-program-bught">
            <div className="wrap-the-box-dicjss">
              <div className="holt-theinfi-jjr"></div>
              <div className="hold-thst-detail"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(Subcription));
