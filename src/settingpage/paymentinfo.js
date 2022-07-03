import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import Paymentmethod from "../payment/paymentMethod";
import { connect } from "react-redux";
import ApiUrl from "../url";
import { GoPlus } from "react-icons/go";
import AddMethod from "../payment/addmethod";

import { IoThumbsUpSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";
class PaymentInfo extends Component {
  state = {
    listCard: null,
    button: false,
    addcard: false,
    acountD: {},
  };
  goBack = () => {
    this.props.history.goBack();
  };

  removeCard = (data) => {
    let option = {
      userid: this.props.users.userid,
      item: data,
    };
    axios
      .post(`/api/api/braintree/v1/remove-payment-methode`, option)
      .then((result) => {
        window.location.reload();
      });
  };
  hnddleclick = () => {
    this.setState({
      addcard: !this.state.addcard,
    });
  };
  getPaymentMethod = () => {
    let option = {
      userid: this.props.users.userid,
    };
    axios.post(`/api/my-payment-methode`, option).then((result) => {
      if (result.data._id) {
        this.setState({
          acountD: result.data,
        });
        if (result.data.paymentTokens.length > 0) {
          this.setState({
            listCard: result.data.paymentTokens,
          });
        } else {
          this.setState({
            listCard: "no",
          });
        }
      } else {
        this.setState({
          listCard: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.getPaymentMethod();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>PaymentInfo</p>
          </div>
        </div>
        <div className="load-the-info-sjdjd"></div>
        <div className="sjcijrjnjir">
          {this.state.listCard !== null
            ? this.state.listCard !== "no"
              ? this.state.listCard.map((item) => {
                  return (
                    <div key={item._id} className="wrapwediiriri">
                      <div
                        className={`wraskfkfofnj-crsfdnf ${
                          item.default == true ? "active" : ""
                        } `}
                      >
                        <div className="positf active">
                          <button></button>
                        </div>
                        <div className="wiijsjfjjfjfj">
                          <div className="sjsjjfkfkfk speoer">
                            <div className="fsjjfjfjr">
                              <div className="boldsfk">{item.kind}</div>
                              <div className="boldsfk"></div>
                              <div className="boldsfk"></div>
                              <div className="boldsfk">
                                {item.default == true ? "Default" : ""}
                              </div>
                            </div>
                          </div>
                          <div className="sjsjjfkfkfk">
                            <div className="fsjjfjfjr">
                              <div className="boldsfk">
                                <button></button>
                                <button></button>
                                <button></button>
                                <button></button>
                              </div>
                              <div className="boldsfk">
                                <button></button>
                                <button></button>
                                <button></button>
                                <button></button>
                              </div>
                              <div className="boldsfk">
                                <button></button>
                                <button></button>
                                <button></button>
                                <button></button>
                              </div>
                              <div className="boldsfk">{item.ending}</div>
                            </div>
                          </div>
                        </div>
                        <div className="skfkfkrjjr"></div>
                      </div>
                      <div className="tabsjdjdj">
                        <button
                          className={`${item.default == true ? "active" : ""}`}
                        >
                          {item.default == true ? "Default" : "Make Default"}
                        </button>
                        <button
                          onClick={() => {
                            this.removeCard(item);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""
            : ""}

          {/*<div onClick={this.hnddleclick} className="skjfmfjjfnfn">
<div className="back-buttorn">
    <GoPlus/>
</div>
    <button>Add Payment Method</button>
</div>*/}
        </div>
        {this.state.addcard == true ? (
          <AddMethod
            acountD={this.state.acountD}
            hnddleclick={this.hnddleclick}
          />
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
  };
};
export default connect(mapstateToProps)(withRouter(PaymentInfo));
