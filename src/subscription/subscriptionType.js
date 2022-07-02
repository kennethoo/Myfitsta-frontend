import React, { Component } from "react";
import axios from "axios";

class SubscriptionType extends Component {
  state = {
    plan: null,
  };
  checkSubscription = () => {
    axios
      .get(`/api/checkSubscriotion/account/${this.props.userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data._id) {
          let plansChoose = this.props.plan.filter(
            (item) => item.planChoose == res.data.PlanOfUser
          );
          if (plansChoose.length > 0) {
            this.setState({
              plan: plansChoose[0],
            });
          }
        }
      });
  };

  componentDidMount = () => {
    //this.checkSubscription()
  };
  render() {
    return this.props.plan !== null ? (
      <div className="wraper-the-plankr">
        <div className="div-wirii">
          <p>{this.props.plan.planChoose}</p>
        </div>
        <div className="wharoor-the-amoiutt">
          <p className="desd">$</p>
          <p className="boififi">{this.props.plan.price}</p>
          <span className="title-4hhf4">/</span>
          <p className="title-4hh4">
            {" "}
            {this.props.plan.planChoose == "Silver"
              ? "month"
              : this.props.plan.planChoose == "Platinium"
              ? "3 month"
              : "Year"}
          </p>
        </div>
      </div>
    ) : (
      <div className="wraper-the-plankr">
        <div className="div-wirii">
          <p></p>
        </div>
        <div className="wharoor-the-amoiutt">
          <p className="desd"></p>
          <p className="boififi"></p>
          <span className="title-4hhf4"></span>
          <p className="title-4hh4"> </p>
        </div>
      </div>
    );
  }
}
export default SubscriptionType;
