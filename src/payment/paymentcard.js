import React, { Component } from "react";
import axios from "axios";
import "braintree-web";
import ApiUrl from "../url";
import DropIn from "braintree-web-drop-in-react";
import { withRouter } from "react-router-dom";
class PaymentCard extends Component {
  instance;
  state = {
    item: null,
    clientToken: null,
  };

  async handleBuy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();
      const response = await axios.post(
        `${ApiUrl.Pay}api/braintree/v1/sandbox`,
        nonce
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(
        `${ApiUrl.Pay}api/braintree/v1/getToken`
      );
      const clientToken = response.data.clientToken;
      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="btetjjts">
        {this.state.clientToken !== null ? (
          <div>
            <DropIn
              options={{
                authorization: this.state.clientToken,
              }}
              onInstance={(instance) => (this.instance = instance)}
            />
            <button
              onClick={() => {
                this.handleBuy(this);
              }}
              className="buyr-theproducf"
            >
              PAY
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(PaymentCard);
