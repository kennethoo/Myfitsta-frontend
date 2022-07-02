import React, { Component } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";
import { connect } from "react-redux";
import SubscriptionType from "./subscriptionType";
import ProIcon from "../programs/proicon";
class SubscriptionInfo extends Component {
  state = {
    profile: null,
    plan: null,
    data: null,
    unbscribe: false,
    loadinUnb: false,
  };

  cancelSubscription = () => {
    this.setState({
      unbscribe: !this.state.unbscribe,
    });
  };

  EndMySubscription = () => {
    this.setState({
      loadinUnb: true,
    });
    let option = {
      User: this.state.data.User,
      subScriber: this.state.data.subScriber,
    };
    axios
      .post("/api/cancel-my-sub-scription-plan-for-programs", option, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.succes == true) {
          let data = this.state.data;
          data.activeSubscription = false;
          this.setState({
            loadinUnb: false,
            unbscribe: false,
            data: data,
          });
        } else {
          window.location.reload();
        }
      });
  };

  checkSubscription = () => {
    axios
      .get(`/api/checkSubscriotion/account/${this.props.item.AuthorId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) {
          let plansChoose = this.state.profile.plan.filter(
            (item) => item.planChoose == res.data.PlanOfUser
          );
          if (plansChoose.length > 0 !== null) {
            this.setState({
              data: res.data,
              plan: plansChoose[0],
            });
          }
        }
      });
  };

  getdata = () => {
    axios
      .get(`/api/myfitstapro/${this.props.item.AuthorId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) {
          this.setState({
            profile: res.data,
          });
          this.checkSubscription();
        }
      });
  };
  componentDidMount = () => {
    this.getdata();
  };
  render() {
    return this.state.profile !== null ? (
      <div className="box-holt-the-people-sunbf">
        <div className="header-oxn">
          <div className="wrpa4rt">
            <div className="icons-rnwjr">
              <ProIcon user={this.state.profile.userid} />
            </div>
            <div className="dfjsjfirf">
              <p>{this.state.profile.Username}</p>
              <div>
                <div>
                  <p>Next payment:</p>
                  <p className="sjfj">
                    {this.state.data !== null
                      ? this.state.data.nextPayingdate
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-iconfn">
            <div className="wjrjwns-braj">
              <div className="wraornjr">
                <p>Programs</p>
                <div className="boxnnsor">
                  {this.state.profile.numberOfProgram}
                </div>
              </div>
              <div className="wraornjr">
                <p>Subscribers</p>
                <div className="boxnnsor">
                  {this.state.profile.numberOfSubscriber}
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.plan !== null ? (
          <SubscriptionType plan={this.state.plan} />
        ) : (
          ""
        )}

        <div className="button-busnn-bossn">
          {this.state.data !== null ? (
            this.state.data.activeSubscription == true ? (
              <button onClick={this.cancelSubscription}>Unsubscribe</button>
            ) : (
              <button>Subscribe</button>
            )
          ) : (
            ""
          )}
        </div>
        {this.state.unbscribe == true ? (
          <div className="unbribeijsjjfjfj">
            <div className="delete-the-colletion ajrjjrj">
              <div className="title-of--thise-action">
                <div
                  onClick={() => this.cancelSubscription()}
                  className="close-that"
                >
                  <IoCloseSharp />
                </div>
                <div>Unsubscribe {this.state.profile.Username}</div>
              </div>
              <div className="jfkjworf">
                By unsubscribing to this account you will no longer have acces
                this account content starting{" "}
                {this.state.data !== null ? this.state.data.nextPayingdate : ""}{" "}
              </div>
              <div className="conte-thise-actionrrr active">
                {this.state.loadinUnb == true ? (
                  <button>
                    <LoadingSpin />
                  </button>
                ) : (
                  <button onClick={this.EndMySubscription}>UNSUBSCRIBE</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    ) : (
      ""
    );
  }
}

const mapStateProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapStateProps)(SubscriptionInfo);
