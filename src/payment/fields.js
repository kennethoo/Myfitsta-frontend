import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import braintree from "braintree-web";
import LoadingSpin from "../component/loadingspin";
import ApiUrl from "../url";
import { connect } from "react-redux";
import axios from "axios";
let program = null;
let userid = "";
class Field extends Component {
  state = {
    clientToken: null,
    program: null,
    loading: false,
  };

  async getclient() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(
        `/api/api/braintree/v1/getToken`
      );
      const clientToken = response.data.clientToken;
      this.setState({ clientToken });
      this.runpay();
    } catch (err) {
      console.error(err);
    }
  }

  runpay = () => {
    var authorization = this.state.clientToken;
    braintree.client.create(
      {
        authorization: authorization,
      },
      (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        this.createHostedFields(clientInstance);
      }
    );
  };

  createHostedFields = (clientInstance) => {
    var form = document.querySelector("#cardForm");
    braintree.hostedFields.create(
      {
        client: clientInstance,
        styles: {
          input: {
            "font-size": "16px",
            "font-family": "courier, monospace",
            "font-weight": "lighter",
            color: "#ccc",
          },
          ".valid": {
            color: "#8bdda8",
          },
        },
        fields: {
          number: {
            selector: "#card-number",
            placeholder: "4111 1111 1111 1111",
          },
          cvv: {
            selector: "#cvv",
            placeholder: "123",
          },
          expirationDate: {
            selector: "#expiration-date",
            placeholder: "MM/YY",
          },
          postalCode: {
            selector: "#postal-code",
            placeholder: "11111",
          },
        },
      },
      (err, hostedFieldsInstance) => {
        var tokenize = (event) => {
          event.preventDefault();

          hostedFieldsInstance.tokenize((err, payload) => {
            if (err) {
              alert(
                "Something went wrong. Check your card details and try again."
              );
              return;
            }
            let option = {
              paymentMethodNonce: payload.nonce,
              program: program,
              userid: userid,
            };
            this.setState({
              loading: true,
            });
            axios
              .post(`/api/api/braintree/v1/sandbox`, option)
              .then((result) => {
                if (result.data.success == true) {
                  this.props.history.push(
                    `/program/unlock/${program.programId}`
                  );
                } else {
                  console.log(result.data);
                }
              });
          });
        };

        form.addEventListener("submit", tokenize, false);
      }
    );
  };

  componentDidMount = () => {
    this.getclient();
    program = this.props.item;
    userid = this.props.users.userid;
  };
  render() {
    return (
      <div className="demo-frame">
        {this.state.clientToken !== null ? (
          <form action="/" method="post" id="cardForm">
            <div className="edit-box-profile">
              <label className="" htmlFor="card-number">
                Card Number
              </label>
              <div id="card-number" className="hosted-fielde"></div>
            </div>
            <div className="edit-box-profile">
              <label htmlFor="expiration-date">Expiration Date</label>
              <div id="expiration-date" className="hosted-fielde"></div>
            </div>
            <div className="edit-box-profile">
              <label className="hosted-fields--label" htmlFor="cvv">
                CVV
              </label>
              <div id="cvv" className="hosted-fielde"></div>
            </div>
            <div className="edit-box-profile">
              <label className="hosted-fields--label" htmlFor="postal-code">
                Postal Code
              </label>
              <div id="postal-code" className="hosted-fielde"></div>
            </div>
            <div className="button-container">
              <input
                type="submit"
                className={`button button--small button--green ${
                  this.state.loading == true ? "loading" : ""
                }`}
                value={`${this.state.loading == true ? "" : "Purchase"}`}
                id="submit"
              />
              {this.state.loading == true ? (
                <div className="jietiooeo">
                  {" "}
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        ) : (
          <div className="jietitooeo">
            <LoadingSpin />
          </div>
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
export default connect(mapstateToProps)(withRouter(Field));
