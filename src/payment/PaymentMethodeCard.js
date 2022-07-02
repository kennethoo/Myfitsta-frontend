import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpin from "../component/loadingspin";
import { connect } from "react-redux";
import ApiUrl from "../url";
let itemCouter = 0;
class PaymentmethodCard extends Component {
  state = {
    payment: null,
    button: false,
    loading: false,
  };

  handleclick = () => {
    this.setState({
      button: true,
    });
    this.props.hideoption();
  };

  getPaymentMethod = () => {
    let option = {
      userid: this.props.users.userid,
    };

    axios.post(`${ApiUrl.Pay}my-payment-methode`, option).then((result) => {
      if (result.data._id) {
        if (result.data.paymentTokens.length > 0) {
          let tochoose = result.data.paymentTokens.filter(
            (item) => item.default == true
          );
          this.setState({
            payment: tochoose[0],
          });
        } else {
          this.setState({
            payment: "no",
          });
        }
      } else {
        this.setState({
          payment: "no",
        });
      }
    });
  };

  handlePay = () => {
    if (this.state.loading == false) {
      let option = {
        program: this.props.item[itemCouter],
        userid: this.props.users.userid,
      };
      this.setState({
        loading: true,
      });
      axios
        .post(`${ApiUrl.Pay}api/braintree/v1/sandbox`, option)
        .then((result) => {
          if (result.data.success == true) {
            itemCouter++;
            if (itemCouter == this.props.item.length) {
              this.props.history.push("/collection/program");
            } else {
              this.handlePay();
            }
          } else {
          }
        });
    }
  };

  componentDidMount = () => {
    this.getPaymentMethod();
  };

  render() {
    return (
      <div className="woffkorkr">
        <div className="wrapfjrr">
          {this.state.payment !== null ? (
            this.state.payment !== "no" ? (
              <div
                onClick={this.handleclick}
                className={`wraskfkfofnj-crsfdnf ${
                  this.state.button == true ? "active" : ""
                } `}
              >
                <div className="positf active">
                  <button></button>
                </div>
                <div className="wiijsjfjjfjfj">
                  <div className="sjsjjfkfkfk">{this.state.payment.kind}</div>
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
                      <div className="boldsfk">{this.state.payment.ending}</div>
                    </div>
                  </div>
                </div>
                <div className="skfkfkrjjr"></div>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className="jietiooeoe">
              {" "}
              <LoadingSpin />
            </div>
          )}
          {this.state.button == true ? (
            <div className="wraohririirii">
              <div className="controil-theaction">
                <button
                  onClick={this.handlePay}
                  className={`add-shch ${
                    this.state.loading == true ? "active" : ""
                  }`}
                >
                  {this.state.loading == true ? "" : "PURCHACE"}
                </button>
                {this.state.loading == true ? (
                  <div className="jietiooeo">
                    {" "}
                    <LoadingSpin />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
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
export default connect(mapstateToProps)(withRouter(PaymentmethodCard));
